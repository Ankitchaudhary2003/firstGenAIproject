/*
Exercise 1: Basic Chatbot
1. takes user input
2. remembers messages
3. exit when user types "exit"
*/

import { GoogleGenAI } from "@google/genai";
import readline from "readline";

const ai = new GoogleGenAI({ apiKey: "enter api key here" });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  // Create chat session
  const chat = await ai.chats.create({
    model: "gemini-2.5-flash",
    history: [
      {
        role: "user",
        parts: [{ text: "My name is Ankit Chaudhary" }],
      },
      {
        role: "model",
        parts: [{ text: "Hello Ankit! How can I help you today?" }],
      },
    ],
  });

  console.log("Chatbot started! Type 'exit' to quit.\n");

  async function ask() {
    rl.question("You: ", async (input) => {
      if (input.toLowerCase() === "exit") {
        console.log("Chat ended.");
        rl.close();
        return;
      }

      const response = await chat.sendMessage({
        message: input,
      });

      console.log("Bot:", response.text);
      ask();
    });
  }

  ask();
}

main();
