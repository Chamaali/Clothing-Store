import React, { useState, useRef, useEffect } from "react";
import "./ChatWidget.css";

function ChatWidget({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [actionInProgress, setActionInProgress] = useState(null); // e.g. 'adding'
  const messagesRef = useRef(null);
  const inputRef = useRef(null);

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

        // Handle non-JSON or non-OK responses gracefully
        let data = null;
        if (response.ok) {
          try {
            data = await response.json();
          } catch (err) {
            // If JSON parsing fails, fall back to plain text
            const txt = await response.text();
            data = { reply: txt || "" };
          }
        } else {
          const txt = await response.text().catch(() => null);
          throw new Error(txt || `Request failed with status ${response.status}`);
        }

        const aiMessage = { text: data?.reply ?? "", sender: "ai" };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
        // If the AI returned a recommendation, add a small delay to simulate typing
        // (server may already do this but this improves perceived interactivity)
        if (data.reply && data.reply.toLowerCase().includes("recommend")) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 600);
        }
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

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Focus input when widget opens
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // Handle a click on a recommendation chip: simulate add-to-cart animation and confirmation
  const handleSuggestionClick = (suggestion) => {
    setActionInProgress(suggestion);
    // show 'Adding...' for 1s then push a confirmation message
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: `${suggestion} was added to your cart ✅`, sender: "ai" }]);
      setActionInProgress(null);
    }, 900);
  };

  return (
    <div className="chat-widget slide-in">
      <div className="chat-header">
        <div className="chat-title">Chat with us</div>
        <button className="chat-close" onClick={() => onClose && onClose()}>✕</button>
      </div>
      <div className="messages" ref={messagesRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender} fade-in`}>
            <div className="message-text">{msg.text}</div>
            {/* If AI suggestion list is returned in a single string, render chips */}
            {msg.sender === "ai" && msg.text && msg.text.toLowerCase().includes("recommend") && (
              <div className="suggestions">
                {msg.text.split(':').pop().split(',').map((sug, i) => {
                  const label = sug.trim();
                  if (!label) return null;
                  return (
                    <button key={i} className="suggestion-chip" onClick={() => handleSuggestionClick(label)}>
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="message ai typing">
            <span className="dot dot-1" />
            <span className="dot dot-2" />
            <span className="dot dot-3" />
          </div>
        )}
      </div>
      <div className="input-area">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message or ask for recommendations..."
        />
        <button onClick={handleSend} disabled={!input.trim()}>Send</button>
      </div>
      {actionInProgress && (
        <div className="action-toast">Adding "{actionInProgress}" to cart...</div>
      )}
    </div>
  );
}

export default ChatWidget;
