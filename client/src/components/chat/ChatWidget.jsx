import React, { useState } from "react";

function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      // Add the user's message safely using functional update
      setMessages((prev) => [...prev, { text: input, sender: "user" }]);
      setInput("");
      setIsTyping(true);
      try {
        const response = await fetch("/api/chat/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        });
        const data = await response.json();
        const aiMessage = { text: data.reply, sender: "ai" };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
        setIsTyping(false);
      } catch (error) {
        console.error(error);
        setIsTyping(false);
        const errorMessage = {
          text: "Sorry, something went wrong.",
          sender: "ai",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };

  return (
    <div className="chat-widget">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="message ai typing">...</div>}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} disabled={!input.trim()}>Send</button>
      </div>
    </div>
  );
}

export default ChatWidget;
