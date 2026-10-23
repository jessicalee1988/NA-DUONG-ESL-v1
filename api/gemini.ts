import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

/**
 * Vercel Serverless Function handler for Google Gemini API requests.
 * Uses model: gemini-2.5-flash
 * Reads server environment variable: process.env.GEMINI_API_KEY
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed. Please use POST.' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'Missing GEMINI_API_KEY environment variable on the server.',
      });
    }

    // Extract prompt from request body
    let prompt: string | undefined;
    if (typeof req.body === 'string') {
      try {
        const parsed = JSON.parse(req.body);
        prompt = parsed?.prompt;
      } catch {
        prompt = req.body;
      }
    } else if (req.body && typeof req.body === 'object') {
      prompt = req.body.prompt;
    }

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        error: 'Invalid request: "prompt" string is required in JSON body.',
      });
    }

    // Initialize the official Google GenAI SDK with the server-side API key
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Call Gemini with the required model: gemini-2.5-flash
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text ?? '';

    // Return { text: string } as JSON
    return res.status(200).json({ text });
  } catch (error: any) {
    console.error('Gemini API Error in /api/gemini:', error);
    return res.status(500).json({
      error: error?.message || 'An error occurred while communicating with Gemini API.',
    });
  }
}
