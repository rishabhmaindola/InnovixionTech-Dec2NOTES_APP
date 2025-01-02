import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const geminiModel = process.env.REACT_APP_GEMINI_MODEL;

async function fetchAI(prompt) {
    if (!prompt) {
        throw new Error("Prompt cannot be empty");
    }
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: geminiModel });
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error fetching AI response:", error);
        throw new Error("Error Fetching AI response")
    }
}

export default fetchAI;
