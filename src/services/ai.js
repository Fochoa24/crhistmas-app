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

  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const prompt = `
    Actúa como un asistente experto en regalos de Navidad en Chile.
    Analiza el siguiente input del usuario: "${interests}".

    Instrucciones clave:
    1. Si el input es un PRODUCTO ESPECÍFICO (ej: "zapatillas blancas", "iphone", "cafetera"), DEBES sugerir modelos, marcas o tipos específicos de ESE producto. NO sugieras accesorios ni productos relacionados (como cordones o limpiadores) a menos que se pida explícitamente.
    2. Si el input es un INTERÉS o HOBBY (ej: "fútbol", "cocinar"), sugiere regalos relacionados creativos.
    3. Busca opciones disponibles en tiendas chilenas (MercadoLibre, Paris, Falabella, Ripley, etc.).

    Devuelve la respuesta SOLAMENTE en formato JSON válido con esta estructura exacta para sugerir 3 opciones para ${memberName}:
    [
      {
        "name": "Nombre específico del producto/regalo",
        "price": "Precio estimado en CLP (ej: $15.990)",
        "store": "Nombre de la tienda sugerida (ej: Falabella)",
        "reason": "Por qué es una buena opción"
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
