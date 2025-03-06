import { getChatbotResponse } from "../services/chatServices.js";

export const chatWithBot = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Debugging step

        const contents = req.body.contents;

        if (!contents || !Array.isArray(contents) || contents.length === 0) {
            return res.status(400).json({ error: "Invalid request: 'contents' must be a non-empty array" });
        }

        const parts = contents[0]?.parts;

        if (!parts || !Array.isArray(parts) || parts.length === 0) {
            return res.status(400).json({ error: "Invalid request: 'parts' must be a non-empty array inside 'contents'" });
        }

        // Extracting the text field
        const prompt = parts[0]?.text;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        console.log("Extracted Prompt:", prompt); // Debugging step

// Continue processing with the extracted prompt...

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        // Get chatbot response with personalized data
        const response = await getChatbotResponse(prompt, req.user);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
