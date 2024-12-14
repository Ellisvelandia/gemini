// Import the GoogleGenerativeAI class from Google's generative AI package
const { GoogleGenerativeAI } = require("@google/generative-ai");
// Load environment variables from .env file
require("dotenv").config();

const fs = require("fs");

// Initialize the Google Generative AI client with API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
// Get an instance of the Gemini 1.5 Flash model
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: fs.readFileSync(path).toString("base64"),
      mimeType: mimeType,
    },
  };
}

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "What's different between these pictures?";
  const imageParts = [
    fileToGenerativePart("cat.jpeg", "image/jpeg"),
    fileToGenerativePart("pikachu.jpg", "image/jpeg"),
  ];

  const result = await model.generateContent({
    contents: [
      {
        parts: [{ text: prompt }, ...imageParts],
      },
    ],
  });

  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();

// // Main async function to interact with the AI model
// async function main() {
//     // Define the prompt to send to the AI
//     const prompt = "Explain how to make a perfect rice";
//     // Generate content based on the prompt
//     const result = await model.generateContent(prompt);
//     // Print the AI's response to the console
//     console.log(result.response.text());
// }

// // Execute the main function and catch any errors
// main().catch(console.error);
