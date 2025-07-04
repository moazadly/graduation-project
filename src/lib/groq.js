import Groq from 'groq-sdk';

// Get API key from environment variables
const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

// Create a function to initialize the client
function createGroqClient() {
  if (!apiKey) {
    console.error('GROQ API key is missing! Make sure NEXT_PUBLIC_GROQ_API_KEY is set in your environment variables.');
    throw new Error('GROQ API key is not configured');
  }

  console.log('Initializing Groq client with API key:', `${apiKey.substring(0, 5)}...`);
  
  return new Groq({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });
}

// Initialize the client
export const groq = createGroqClient();

export default groq;