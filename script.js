let currentCategory = 'happiness'; // Default category
const sendButton = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

// Switch category when a button is clicked
function switchCategory(category) {
    currentCategory = category;
    chatBox.innerHTML = ''; // Clear chat box
    addMessage("You are now in the " + category + " category.", "Safety Chat");
}

// Add messages to chat
function addMessage(message, sender = 'User') {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender === 'Safety Chat' ? 'bot-message' : 'user-message');
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

// Add emoji based on category
function addEmoji() {
    const emojis = {
        happiness: "😊💖",
        bullying: "😢💔",
        'problem-solving': "🤔💡"
    };
    return emojis[currentCategory] || "";
}

// Function to simulate bot responses
function getBotResponses() {
    const responses = {
        happiness: [
            "It's okay to feel sad sometimes. I'm here to listen. " + addEmoji(),
            "You are stronger than you think. Keep going! " + addEmoji(),
            "Take a deep breath and remember, you're not alone. " + addEmoji()
        ],
        bullying: [
            "Bullying is never acceptable. Talk to someone you trust. " + addEmoji(),
            "Remember, you're not alone, and you deserve respect. " + addEmoji(),
            "You should tell a family member or friend about what's happening. " + addEmoji()
        ],
        'problem-solving': [
            "Start by breaking the problem down into smaller steps. You can do it! " + addEmoji(),
            "Have you thought about other possible solutions? " + addEmoji(),
            "Sometimes, it helps to take a step back and re-evaluate. " + addEmoji()
        ]
    };
    
    return responses[currentCategory] || [];
}

// Handle user input and bot responses
sendButton.addEventListener("click", () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message); // Add user message
        userInput.value = ''; // Clear input
        const botResponses = getBotResponses();
        let randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

        setTimeout(() => addMessage(randomResponse, "Safety Chat"), 1000); // Bot response after 1 second
    }
});

// Send message when Enter key is pressed
userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // Prevent new line
        sendButton.click();
    }
});