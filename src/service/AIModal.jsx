import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY,
});

export async function generatePlanFromAI() {
  const prompt = `Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget. Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions. Also suggest an itinerary with:
- Place Name
- Place Details
- Place Image Url
- Geo Coordinates
- Ticket Pricing
- Rating
- Travel Time between locations for 3 days

Provide each day's plan and best time to visit in JSON format.`;

  const result = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    },
  });

  const text = await result.text;;
  return text;
}
