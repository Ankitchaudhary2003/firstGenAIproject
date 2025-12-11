import { GoogleGenAI } from "https://cdn.jsdelivr.net/npm/@google/genai@1.32.0/+esm";

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Initialize Gemini AI
const ai = new GoogleGenAI({
    apiKey: "AIzaSyA6kzPg6rytvjvJFKsp3kn8O6QeMC7lp9o" // Replace with your actual key
});

const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
        systemInstruction: `You are an AI Psychotherapist. Your role is to provide empathetic, professional, and supportive responses to users regarding therapy, mental health, and emotional wellbeing.

Guidelines:
1. Respond only to questions related to therapy, mental health, or emotional wellbeing.
2. Answers should be between 10 and 30 words.
3. Reply empathetically, as a caring human therapist would, and provide encouragement or validation where appropriate.
4. Ask follow-up questions when necessary to understand the user’s feelings or situation better.
5. Provide answers in a **point-wise format** to improve clarity.
6. If the user asks something unrelated to mental health, politely inform them that you only answer therapy-related questions.
7. Avoid overly technical or clinical jargon; maintain a human-like, conversational tone.
8. Ensure your responses are supportive, non-judgmental, and focused on the user’s wellbeing.
 `
    }
});

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.innerHTML = text.replace(/\n/g, '<br>');
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `<span>Typing...</span>`;
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

async function handleSend() {
    const message = userInput.value.trim();
    if (!message) return;

    userInput.disabled = true;
    sendBtn.disabled = true;

    addMessage(message, 'user');
    userInput.value = '';

    showTyping();

    try {
        const response = await chat.sendMessage({ message });
        removeTyping();
        addMessage(response.text, 'assistant');
    } catch (err) {
        removeTyping();
        addMessage('Error: ' + err.message, 'assistant');
        console.error(err);
    }

    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.focus();
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});
