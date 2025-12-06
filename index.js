import readline from "readline-sync";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "use your api key for running of this project" });

async function main() {
  while (true) {
    const userInput = readline.question("You: ");

    if (userInput.toLowerCase() === "exit") break;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userInput,
    });

    console.log("AI:", response.text);
  }
}

main();
