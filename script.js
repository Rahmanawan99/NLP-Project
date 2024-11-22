function appendMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
    messageDiv.innerHTML = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;  // Auto-scroll to latest message
}

function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    // Append the user's message to the chat
    appendMessage(userInput, "user");
    document.getElementById("user-input").value = "";  // Clear the input field

    // Send the message to the Flask backend
    fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })  // Send the user's message in the body
    })
    .then(response => response.json())
    .then(data => {
        // Append the bot's response to the chat
        appendMessage(data.response, "bot");
    })
    .catch(error => {
        console.error('Error:', error);
        appendMessage("Sorry, there was an error with the server.", "bot");
    });
}

// Add an event listener for the Enter key to send messages
document.getElementById("user-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
