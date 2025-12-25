
import { GoogleGenAI, Type } from "@google/genai";
import { User, UserAction } from "../types";

export const getDashboardInsights = async (users: User[], actions: UserAction[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const userSummary = users.map(u => `${u.name} (${u.role}, ${u.status})`).join(', ');
  const actionSummary = actions.map(a => `${a.userName} performed ${a.action} at ${a.timestamp}`).join('; ');

  const prompt = `
    Analyze the following user data and recent activity for a management dashboard.
    Provide a concise summary (max 150 words) including:
    1. Overall health of user engagement.
    2. Potential security concerns or unusual activity.
    3. One actionable recommendation for the administrator.

    Users: ${userSummary}
    Recent Actions: ${actionSummary}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI service. Please check your API key configuration.";
  }
};
