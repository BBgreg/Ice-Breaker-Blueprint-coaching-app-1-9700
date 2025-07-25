import OpenAI from 'openai';

// Check if API key exists
const apiKey = import.meta.env.VITE_OPENAI_API_KEY || 'mock-key';

let openai;

try {
  openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
} catch (error) {
  console.error('Error initializing OpenAI:', error);
  
  // Fallback mock implementation
  openai = {
    chat: {
      completions: {
        create: () => {
          throw new Error('OpenAI API not properly configured');
        }
      }
    }
  };
}

export { openai };