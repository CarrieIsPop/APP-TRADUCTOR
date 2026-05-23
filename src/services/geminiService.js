import { GoogleGenerativeAI } from "@google/generative-ai";

export const traducirTexto = async (texto, idiomaOrigen, idiomaDestino) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();

    if (!apiKey) {
        return "Error: No se encontró la API Key en el .env";
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

        const prompt = `Actúa como un traductor profesional nativo. Traduce el siguiente texto del ${idiomaOrigen} al ${idiomaDestino}. 
            Reglas estrictas:
            1. Usa la ortografía, gramática y caracteres especiales correctos (acentos, tildes, cedillas, etc.) del idioma de destino.
            2. Agrega los signos de puntuación (comas, interrogaciones) que correspondan por contexto, incluso si el texto original no los tiene.
            3. Solo devuelve el texto traducido, sin comillas ni explicaciones.
            Texto original: "${texto}"`;

        const result = await model.generateContent(prompt);
        return result.response.text().trim();

    } catch (error) {
        console.error("🚨 Error detallado de la API:", error);
        return "Error al traducir. Revisa tu conexión.";
    }
};