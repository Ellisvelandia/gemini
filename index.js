// Import the GoogleGenerativeAI class from Google's generative AI package
const { GoogleGenerativeAI } = require("@google/generative-ai");
// Load environment variables from .env file
require('dotenv').config();

// Initialize the Google Generative AI client with API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
// Get an instance of the Gemini 1.5 Flash model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Main async function to interact with the AI model
async function main() {
    // Define the prompt to send to the AI
    const prompt = "Explain how AI works";
    // Generate content based on the prompt
    const result = await model.generateContent(prompt);
    // Print the AI's response to the console
    console.log(result.response.text());
}

// Execute the main function and catch any errors
main().catch(console.error);