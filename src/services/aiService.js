import { openai } from '../config/openai';

// Mock data for when OpenAI API is not available
const mockBlueprint = {
  strategy: "Based on the shared interest in technology and professional development, I recommend a value-first approach that acknowledges their expertise before transitioning to a personal connection point. This balances professional respect with authentic relationship building.",
  iceBreakers: [
    {
      text: "I noticed you've been working on AI ethics projects at your company - that's an area I'm really passionate about too. What sparked your interest in the ethical dimensions of technology?",
      explanation: "This shows you've done your research while inviting them to share their professional journey and values."
    },
    {
      text: "Your presentation at the SF Tech Conference was really insightful. I particularly connected with your point about user-centric design. What led you to develop that perspective?",
      explanation: "This specific compliment followed by a question demonstrates genuine engagement with their work."
    },
    {
      text: "I see we both have experience in the startup world. What's been your most valuable lesson from that environment that you still apply today?",
      explanation: "This establishes common ground while inviting them to share wisdom and reflect on their journey."
    },
    {
      text: "Jane mentioned you're an expert in sustainable energy solutions. I've been following developments in that space - what recent innovation do you think has the most potential?",
      explanation: "This acknowledges the warm introduction while positioning them as the expert in a field you're genuinely interested in."
    }
  ],
  discoveryQuestions: [
    {
      text: "What's keeping you busy outside of work these days?",
      explanation: "This open-ended question creates space for them to reveal personal interests without being intrusive."
    },
    {
      text: "I'm looking to expand my professional reading - have you come across any books or resources recently that you've found valuable?",
      explanation: "This seeks their recommendation, subtly highlighting your growth mindset while potentially revealing their interests."
    },
    {
      text: "How did you find yourself working in this industry? Was it a planned path or more of an unexpected journey?",
      explanation: "This invites them to share their career story, often revealing values, motivations, and personal background."
    },
    {
      text: "What part of your work do you find most energizing right now?",
      explanation: "This positive framing encourages them to share what they're passionate about, revealing potential connection points."
    }
  ],
  valueAdds: [
    {
      action: "Share the recent McKinsey report on sustainable technology adoption",
      template: "I just read this report that aligns perfectly with what you were saying about renewable energy infrastructure. Thought you might find it valuable for your upcoming project.",
      explanation: "This provides immediate, relevant value that positions you as a thoughtful resource rather than someone making a request."
    },
    {
      action: "Introduce them to Dr. Sarah Chen, who leads AI ethics research at Stanford",
      template: "Your work in AI governance reminds me of my colleague Sarah's research at Stanford. Would you be interested in an introduction? I think you'd have a fascinating conversation.",
      explanation: "This offers access to your network in a way that could genuinely benefit their professional interests."
    },
    {
      action: "Invite them to the upcoming Tech For Good conference where you're speaking",
      template: "I'm participating in a panel on sustainable technology at the Tech For Good conference next month. Given your expertise, I'd love to have you join as my guest if you're interested.",
      explanation: "This provides exclusive access while positioning you both as peers in the same professional community."
    }
  ],
  followUp: {
    nextStep: "If no response within 7 days, follow up with a link to a relevant new article in their field with a brief, no-pressure note",
    suggestedTopic: "Reference something specific from your initial conversation, such as asking about progress on the project they mentioned"
  }
};

const generateBlueprint = async (formData) => {
  const { userInfo, targetInfo, scenario } = formData;

  // Check if OpenAI API key is available
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    console.log('Using mock data as OpenAI API key is not available');
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        resolve(mockBlueprint);
      }, 2000);
    });
  }

  const prompt = `
You are an expert relationship and networking coach. Based on the F.O.R.D. framework (Family, Occupation, Recreation, Dreams), analyze the provided information and generate a comprehensive connection blueprint.

USER INFORMATION:
${userInfo}

TARGET PERSON INFORMATION:
${targetInfo}

SCENARIO: ${scenario}

Please generate a JSON response with the following structure:

{
  "strategy": "A concise paragraph outlining the recommended approach (2-3 sentences)",
  "iceBreakers": [
    {
      "text": "Comment + Question opener (max 350 characters)",
      "explanation": "One sentence explaining why this works"
    }
  ],
  "discoveryQuestions": [
    {
      "text": "Subtle, open-ended question to reveal mutual ground",
      "explanation": "One sentence explaining why this works"
    }
  ],
  "valueAdds": [
    {
      "action": "Specific actionable gesture",
      "template": "Optional message template if applicable",
      "explanation": "One sentence explaining why this works"
    }
  ],
  "followUp": {
    "nextStep": "Recommended follow-up action",
    "suggestedTopic": "Topic for future conversation"
  }
}

REQUIREMENTS:
- Generate 4 ice breakers following the "Comment + Question" format
- Generate 4 discovery questions that are subtle and natural
- Generate 3 value-add suggestions that are specific and actionable
- Each opener should be under 350 characters
- Focus on finding common ground based on F.O.R.D. framework
- Tailor the tone and approach to the specific scenario
- Make suggestions concrete and immediately actionable
- Avoid generic advice - be specific to the provided information

Return only valid JSON without any additional text or formatting.
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert relationship and networking coach specializing in creating personalized conversation strategies based on the F.O.R.D. framework. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = response.choices[0].message.content.trim();
    
    // Remove any potential markdown formatting
    const jsonContent = content.replace(/```json\n?|\n?```/g, '');
    
    return JSON.parse(jsonContent);
  } catch (error) {
    console.error('Error generating blueprint:', error);
    return mockBlueprint;
  }
};

export { generateBlueprint };