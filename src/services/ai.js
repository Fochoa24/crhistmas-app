import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
}

export const getGiftSuggestions = async (memberName, interests) => {
    if (!genAI) {
        throw new Error("API Key no configurada. Agrega VITE_GEMINI_API_KEY al archivo .env");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Actúa como un asistente experto en regalos de Navidad.
    Sugiere 3 regalos creativos y adecuados para ${memberName}, basándote en que le gusta: "${interests}".
    
    Devuelve la respuesta SOLAMENTE en formato JSON válido con esta estructura exacta (sin markdown, sin bloques de código):
    [
      {
        "name": "Nombre del regalo",
        "priceRange": "Rango de precio estimado (en CLP o USD)",
        "reason": "Breve explicación de por qué es buen regalo"
      }
    ]
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // Clean potential markdown code blocks
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error fetching AI suggestions:", error);
        throw new Error("No se pudieron generar sugerencias. Intenta de nuevo.");
    }
};
