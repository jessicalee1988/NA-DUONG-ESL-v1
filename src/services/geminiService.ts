/**
 * Frontend Gemini Service
 * 
 * Secure client-side service for interacting with Gemini AI.
 * All API key management and SDK execution are handled securely on the server
 * via the Vercel Serverless Function endpoint: /api/gemini
 * 
 * No GoogleGenerativeAI SDK or API keys are imported or exposed in the browser bundle.
 */

export interface GeminiApiResponse {
  text: string;
}

export interface GeminiApiError {
  error: string;
}

/**
 * Sends a prompt to the /api/gemini serverless endpoint and returns the generated text.
 * 
 * @param prompt - The prompt text to process with Gemini
 * @returns The generated response text string
 * @throws Error if the API request fails or returns an error
 */
export async function generateGeminiContent(prompt: string): Promise<string> {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('A valid prompt string must be provided.');
  }

  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    let errorDetail = `Request failed with status code ${response.status}`;
    try {
      const errorJson: GeminiApiError = await response.json();
      if (errorJson?.error) {
        errorDetail = errorJson.error;
      }
    } catch {
      // Body was not JSON or failed to parse, use default status error
    }
    throw new Error(errorDetail);
  }

  const data: GeminiApiResponse = await response.json();
  return data.text;
}

/**
 * Calls the serverless /api/gemini endpoint and returns `{ text: string }`.
 * 
 * @param prompt - The prompt text to process with Gemini
 * @returns Object containing the generated text property `{ text: string }`
 */
export async function callGemini(prompt: string): Promise<{ text: string }> {
  const text = await generateGeminiContent(prompt);
  return { text };
}

/**
 * Default export providing the service functions
 */
export default {
  generateGeminiContent,
  callGemini,
};
