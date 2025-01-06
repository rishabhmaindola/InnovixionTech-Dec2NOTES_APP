import { GoogleGenerativeAI } from '@google/generative-ai';

// const apiKey = localStorage.getItem('apiKey');
const geminiModel = "gemini-1.5-flash";

async function fetchAI(prompt) {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
        return "API key is not stored. Please save an API key.You can save your gemini api key from the settings.";
    }
    if (!prompt) {
        return "Prompt cannot be empty";
    }
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: geminiModel });
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Error Fetching AI response";
    }
}

export default fetchAI;