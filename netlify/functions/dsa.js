/**
 * DSA questions API - Netlify Function (proxies to backend when BACKEND_URL is set).
 * For Hostinger, run the Node backend and point frontend VITE_API_URL to it; this function is optional.
 */

export const handler = async (event) => {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const backendUrl = process.env.BACKEND_URL || process.env.VITE_API_URL;
  if (!backendUrl) {
    return {
      statusCode: 503,
      headers: corsHeaders,
      body: JSON.stringify({
        error: 'Backend not configured. Set BACKEND_URL or VITE_API_URL to your Node API (e.g. Hostinger).',
      }),
    };
  }

  const fullPath = event.path || '';
  const base = '/.netlify/functions/dsa';
  const rest = fullPath.startsWith(base) ? fullPath.slice(base.length) : fullPath;
  const target = `${backendUrl.replace(/\/$/, '')}/api/dsa${rest}`;

  try {
    const res = await fetch(target, {
      headers: event.headers?.authorization ? { Authorization: event.headers.authorization } : {},
    });
    const body = await res.text();
    return {
      statusCode: res.status,
      headers: corsHeaders,
      body: body || '{}',
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: corsHeaders,
      body: JSON.stringify({ error: err?.message || 'Backend unreachable' }),
    };
  }
};
