/**
 * Chat API routes: /api/chat, /api/dsa/ai-assist, /api/chat/fallback.
 * Uses Groq with fallback; requires GROQ_API_KEY and session rate limiting.
 */
import { Router } from 'express';
import Groq from 'groq-sdk';
import {
  GROQ_MODELS,
  getNextFallbackModel,
  getModelConfig,
  isModelSupported,
  getPrimaryModel,
} from '../../config/models.js';

const PRIMARY_MODEL = getPrimaryModel();
const MAX_TOKENS = parseInt(process.env.MAX_TOKENS_PER_REQUEST || '300', 10);
const RATE_LIMIT_REQUESTS = parseInt(process.env.RATE_LIMIT_REQUESTS_PER_MINUTE || '10', 10);
const CONVERSATION_HISTORY_LIMIT = parseInt(process.env.CONVERSATION_HISTORY_LIMIT || '5', 10);

const sessionStore = new Map();

function getOrCreateSession(sessionId) {
  if (!sessionStore.has(sessionId)) {
    sessionStore.set(sessionId, {
      requestCount: 0,
      resetTime: Date.now() + 60000,
      rateLimitExceeded: false,
      rateLimitExceededTime: null,
    });
  }
  return sessionStore.get(sessionId);
}

export function checkRateLimit(sessionId) {
  const session = getOrCreateSession(sessionId);
  const now = Date.now();
  if (now > session.resetTime) {
    session.requestCount = 0;
    session.resetTime = now + 60000;
    session.rateLimitExceeded = false;
  }
  if (session.rateLimitExceeded) {
    const cooldownTime = 60 * 1000;
    if (now - session.rateLimitExceededTime < cooldownTime) {
      return { allowed: false, reason: 'rate_limit_exceeded_cooldown', message: 'Too many requests. Please wait a moment before trying again.' };
    }
    session.rateLimitExceeded = false;
    session.rateLimitExceededTime = null;
  }
  if (session.requestCount >= RATE_LIMIT_REQUESTS) {
    session.rateLimitExceeded = true;
    session.rateLimitExceededTime = now;
    return { allowed: false, reason: 'rate_limit_exceeded', message: 'Too many requests. Please wait a moment before trying again.' };
  }
  session.requestCount++;
  return { allowed: true };
}

function trimConversationHistory(messages) {
  return messages.length > CONVERSATION_HISTORY_LIMIT ? messages.slice(-CONVERSATION_HISTORY_LIMIT) : messages;
}

function isModelDecommissionedError(error) {
  return (
    error.error?.code === 'model_decommissioned' ||
    error.code === 'model_decommissioned' ||
    (error.message && error.message.includes('decommissioned'))
  );
}

function mapGroqError(error, statusCode) {
  const errorMessage = error.message || 'Unknown error';
  const errorStatus = error.status || statusCode;
  if (errorMessage.includes('API key') || errorStatus === 401) {
    return { userMessage: 'Authentication error. Please contact support.', isServiceDown: false };
  }
  if (errorMessage.includes('rate limit') || errorStatus === 429) {
    return { userMessage: 'The AI service is experiencing high demand. Please wait a moment and try again.', isServiceDown: false };
  }
  if (isModelDecommissionedError(error)) {
    return { userMessage: 'The AI service is temporarily unavailable. Please try again in a moment.', isServiceDown: true };
  }
  if (errorMessage.includes('timeout') || errorMessage.includes('ECONNREFUSED')) {
    return { userMessage: 'Connection timeout. Please check your internet and try again.', isServiceDown: true };
  }
  if (errorStatus >= 500) {
    return { userMessage: 'The AI service is temporarily unavailable. Please try again later.', isServiceDown: true };
  }
  return { userMessage: 'An error occurred while processing your request. Please try again.', isServiceDown: false };
}

async function callGroqWithFallback(groq, messages, initialModel, sessionId) {
  let currentModel = initialModel;
  const attemptedModels = [currentModel];
  let lastError = null;
  try {
    const modelConfig = getModelConfig(currentModel);
    const response = await groq.chat.completions.create({
      messages,
      model: currentModel,
      temperature: modelConfig.temperature,
      max_tokens: Math.min(modelConfig.maxTokens, MAX_TOKENS),
      top_p: modelConfig.topP,
    });
    return { response, model: currentModel, attemptedModels, fallbackUsed: false };
  } catch (error) {
    lastError = error;
    if (isModelDecommissionedError(error)) {
      const nextModel = getNextFallbackModel(currentModel);
      if (nextModel && isModelSupported(nextModel)) {
        attemptedModels.push(nextModel);
        currentModel = nextModel;
        try {
          const modelConfig = getModelConfig(currentModel);
          const response = await groq.chat.completions.create({
            messages,
            model: currentModel,
            temperature: modelConfig.temperature,
            max_tokens: Math.min(modelConfig.maxTokens, MAX_TOKENS),
            top_p: modelConfig.topP,
          });
          return { response, model: currentModel, attemptedModels, fallbackUsed: true };
        } catch (fallbackError) {
          lastError = fallbackError;
        }
      }
    }
    throw lastError;
  }
}

export function createChatRouter(groq) {
  const router = Router();

  router.post('/chat', async (req, res) => {
    const startTime = Date.now();
    const { message, sessionId, conversationHistory = [] } = req.body;
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required and must be a non-empty string' });
    }
    if (!sessionId || typeof sessionId !== 'string') {
      return res.status(400).json({ error: 'Session ID is required' });
    }
    const trimmedMessage = message.trim().substring(0, 2000);
    const rateLimitCheck = checkRateLimit(sessionId);
    if (!rateLimitCheck.allowed) {
      return res.status(429).json({ error: rateLimitCheck.message, retryAfter: 60 });
    }
    const trimmedHistory = trimConversationHistory(conversationHistory);
    const messages = [
      { role: 'system', content: 'You are Nova, a helpful AI assistant for TechMaster. Keep responses concise. Maximum 2-3 sentences.' },
      ...trimmedHistory.map((msg) => ({ role: msg.from === 'user' ? 'user' : 'assistant', content: msg.text })),
      { role: 'user', content: trimmedMessage },
    ];
    if (!groq) {
      return res.status(503).json({ error: 'Chat is unavailable.', code: 'GROQ_API_KEY_NOT_SET' });
    }
    try {
      const groqResult = await callGroqWithFallback(groq, messages, PRIMARY_MODEL, sessionId);
      const botResponse = groqResult.response.choices?.[0]?.message?.content || 'No response generated';
      const tokensUsed = groqResult.response.usage?.total_tokens || 0;
      res.json({
        response: botResponse,
        tokensUsed,
        responseTime: Date.now() - startTime,
        model: groqResult.model,
        fallbackUsed: groqResult.fallbackUsed,
        attemptedModels: groqResult.attemptedModels,
      });
    } catch (error) {
      const { userMessage, isServiceDown } = mapGroqError(error, error.status);
      res.status(error.status || 500).json({ error: userMessage, isServiceDown });
    }
  });

  router.post('/dsa/ai-assist', async (req, res) => {
    const startTime = Date.now();
    const { message, sessionId, systemPrompt, conversationHistory = [] } = req.body;
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }
    if (!sessionId) return res.status(400).json({ error: 'Session ID is required' });
    const rateLimitCheck = checkRateLimit(sessionId);
    if (!rateLimitCheck.allowed) return res.status(429).json({ error: rateLimitCheck.message, retryAfter: 60 });
    if (!groq) return res.status(503).json({ error: 'AI service unavailable.', code: 'GROQ_API_KEY_NOT_SET' });
    const trimmedMessage = message.trim().substring(0, 2000);
    const trimmedHistory = trimConversationHistory(conversationHistory);
    const messages = [
      { role: 'system', content: systemPrompt || 'You are a helpful DSA coding coach. Never give full solutions.' },
      ...trimmedHistory.map((msg) => ({ role: msg.from === 'user' ? 'user' : 'assistant', content: msg.text })),
      { role: 'user', content: trimmedMessage },
    ];
    try {
      const groqResult = await callGroqWithFallback(groq, messages, PRIMARY_MODEL, sessionId);
      const botResponse = groqResult.response.choices?.[0]?.message?.content || 'No response generated';
      res.json({ response: botResponse, responseTime: Date.now() - startTime, model: groqResult.model });
    } catch (error) {
      const { userMessage } = mapGroqError(error, error.status);
      res.status(error.status || 500).json({ error: userMessage });
    }
  });

  router.post('/chat/fallback', (req, res) => {
    const fallbackResponses = [
      'The AI service is currently unavailable. Please try again in a few moments.',
      'Our AI is taking a quick break. Feel free to ask again shortly.',
      "I'm temporarily unavailable. Please try again in a few minutes.",
    ];
    res.json({ response: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)], isFallback: true });
  });

  return router;
}
