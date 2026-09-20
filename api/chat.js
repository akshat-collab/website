/**
 * Vercel serverless: POST /api/chat
 * Knowledge base first → Groq AI → friendly fallback
 */

import Groq from "groq-sdk";

const GROQ_MODELS = {
  primary: "llama-3.1-8b-instant",
  fallback: "llama-3.3-70b-versatile",
  emergency: "llama-3.1-8b-instant",
};

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function setCors(res) {
  Object.entries(cors).forEach(([k, v]) => res.setHeader(k, v));
}

async function callGroq(groq, messages, model) {
  const response = await groq.chat.completions.create({
    messages,
    model,
    temperature: 0.7,
    max_tokens: 350,
    top_p: 0.9,
  });
  return response;
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const start = Date.now();

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const { message, sessionId, conversationHistory = [] } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const trimmed = message.trim().substring(0, 2000);
    const history = Array.isArray(conversationHistory) ? conversationHistory.slice(-5) : [];

    // Knowledge base
    try {
      const { searchKnowledgeBase } = await import("../src/data/knowledgeBase.js");
      const kb = searchKnowledgeBase(trimmed);
      if (kb) {
        return res.status(200).json({
          response: kb,
          source: "knowledge",
          responseTime: Date.now() - start,
        });
      }
    } catch {
      /* continue to AI */
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (apiKey?.trim()) {
      try {
        const groq = new Groq({ apiKey });
        const messages = [
          {
            role: "system",
            content:
              "You are Nova, a helpful AI assistant for TechMasterAI, a competitive programming platform. Keep responses concise (2-3 sentences), friendly, and focused on coding and the platform.",
          },
          ...history.map((msg) => ({
            role: msg.from === "user" ? "user" : "assistant",
            content: msg.text,
          })),
          { role: "user", content: trimmed },
        ];

        let response;
        let model = GROQ_MODELS.primary;
        try {
          response = await callGroq(groq, messages, model);
        } catch {
          model = GROQ_MODELS.fallback;
          response = await callGroq(groq, messages, model);
        }

        const text =
          response.choices?.[0]?.message?.content ||
          "I couldn't generate a response. Please try rephrasing.";

        return res.status(200).json({
          response: text,
          source: "api",
          model,
          sessionId: sessionId || null,
          responseTime: Date.now() - start,
        });
      } catch (err) {
        console.error("Groq chat failed:", err?.message || err);
      }
    }

    return res.status(200).json({
      response:
        "Hi! I'm Nova from TechMasterAI. Ask about DSA practice, 1v1 duels, CTF, Data Science, or our team — I can help you get started.",
      source: "fallback",
      responseTime: Date.now() - start,
    });
  } catch (err) {
    console.error("chat api error:", err);
    return res.status(200).json({
      response:
        "Hello! I'm Nova. I'm having a brief hiccup — try asking about TechMasterAI features, DSA, or how to join a challenge.",
      source: "fallback",
      responseTime: Date.now() - start,
    });
  }
}
