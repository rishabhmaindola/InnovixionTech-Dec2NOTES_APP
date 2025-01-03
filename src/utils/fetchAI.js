import { GoogleGenerativeAI } from '@google/generative-ai';

const geminiModel = "gemini-1.5-pro";

async function fetchAI(prompt) {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
        return "API key is missing. Please save the API key in the settings";
    }
    if (!prompt || typeof prompt !== "string") {
        return "Invalid prompt.";
    }

    try {
        const genAI = new GoogleGenerativeAI({ apiKey });

        const model =  genAI.getGenerativeModel({ model: geminiModel });

        const result = await model.generateContent({ prompt });

        return result.response.text();
    } catch (error) {
        return "An unexpected error occurred while fetching the AI response.";
    }
}

export default fetchAI;
