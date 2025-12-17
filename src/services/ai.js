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

  // 1. GENERAR CLAVE DE CACHÉ
  const cacheKey = `gift_suggestions_${interests.toLowerCase().trim()}`;

  // 2. REVISAR CACHÉ
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    try {
      console.log("⚡ Usando respuesta en caché para:", interests);
      return JSON.parse(cachedData);
    } catch (e) {
      console.warn("Error parsing cache:", e);
      localStorage.removeItem(cacheKey);
    }
  }

  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const prompt = `
    Actúa como un asistente de compras experto (Personal Shopper) en Chile.
    Tu objetivo es encontrar los mejores productos para comprar.
    
    INPUT DEL USUARIO: "${interests}"

    REGLAS ESTRICTAS DE INTERPRETACIÓN:
    1. CATEGORÍA "PRODUCTO ESPECÍFICO": Si el usuario escribe un objeto tangible (ej: "zapatillas blancas", "iphone 15", "cafetera", "perfume"), TU ÚNICA TAREA es buscar modelos y marcas de ESE MISMO OBJETO.
       - 🚫 PROHIBIDO: No sugieras accesorios, complementos o "kits de cuidado" (ej: nada de limpiadores, fundas, o repuestos) a menos que el usuario lo escriba explícitamente (ej: "funda para iphone").
       - ✅ PERMITIDO: Sugerir marcas específicas disponibles en Chile (ej: Nike Air Force 1, Adidas Stan Smith, Converse Chuck Taylor).
    
    2. CATEGORÍA "INTERÉS/HOBBY": Solo si el input es abstracto (ej: "fútbol", "cocinar", "le gusta el arte"), entonces sí sugiere regalos relacionados creativos.

    3. CONTEXTO CHILE: Usa precios reales en CLP y tiendas chilenas (Falabella, Paris, Ripley, MercadoLibre, Zora).

    Responde SOLAMENTE con este JSON exacto. DEBES generar EXACTAMENTE 8 (OCHO) OPCIONES variadas:
    [
      {
        "name": "Nombre EXACTO del modelo/producto",
        "price": "Precio aprox en CLP",
        "store": "Tienda en Chile",
        "reason": "Por qué este modelo es bueno"
      }
    ]
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Clean potential markdown code blocks
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(jsonString);

    // 3. GUARDAR EN CACHÉ
    try {
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (e) {
      console.warn("Storage full, cannot cache result:", e);
    }

    return data;
  } catch (error) {
    console.error("Error fetching AI suggestions:", error);

    // Check for quota exceeded error (429) or service overloaded (503)
    if (error.message?.includes("429") || error.message?.includes("Quota exceeded")) {
      throw new Error("⏳ Has usado muchas consultas seguidas. Espera unos segundos e intenta de nuevo (Límite gratuito de Google).");
    }

    throw new Error("No se pudieron generar sugerencias. Intenta de nuevo.");
  }
};
