import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this context, we'll proceed, but API calls will fail without a key.
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const fetchSafetyTip = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Provide a concise and practical women's safety tip for someone in India. The tip should be empowering and easy to remember. Do not include any introductory or concluding phrases, just the tip itself."
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching safety tip from Gemini:", error);
    return "Could not fetch a safety tip at the moment. Please remember to stay aware of your surroundings.";
  }
};

export const fetchSafetyArticles = async (): Promise<any[]> => {
  if (!API_KEY) {
    console.error("Cannot fetch articles without Gemini API key.");
    return []; // Return empty array if no key
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Generate an array of 3 practical women's safety articles for users in India. Each object in the array should have the following structure: { \"category\": \"string\", \"title\": \"string\", \"summary\": \"string\" }. The categories should be varied, like 'Urban Safety', 'Digital Security', or 'Travel Awareness'. The content should be concise, empowering, and directly useful.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
            },
            required: ["category", "title", "summary"],
          },
        },
      },
    });
    
    // The response text is a JSON string, so we parse it.
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error fetching safety articles from Gemini:", error);
    // Return a default article on error to ensure the UI doesn't break
    return [{
      category: "General",
      title: "Awareness is Key",
      summary: "Could not fetch AI-powered articles. Always be aware of your surroundings and trust your instincts. If a situation feels unsafe, it probably is. Remove yourself from it as quickly as possible."
    }];
  }
};

export const fetchAIInsight = async (context: string): Promise<string> => {
  if (!API_KEY) {
    return "AI analysis is unavailable without an API key.";
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `As an advanced personal safety AI, analyze the following situation for a user in India and provide one concise, actionable, and empowering safety recommendation. Be direct. Situation: "${context}"`
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching AI insight from Gemini:", error);
    return "Could not generate an AI insight right now. Always trust your instincts and prioritize your safety.";
  }
};