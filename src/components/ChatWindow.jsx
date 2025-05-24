import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import PromptSuggestions from "./PromptSuggestions";
import { sendQuery } from "../api";

const ChatWindow = ({ onClose, onQueryResponse }) => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! Ask me anything about your data." },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { type: "user", text: input }]);
    try {
      const response = await sendQuery(input);
      setMessages((msgs) => [
        ...msgs,
        {
          type: "bot",
          text: response.data
            ? JSON.stringify(response.data, null, 2)
            : response.query || "No response",
          chart: response.chart,
        },
      ]);
      // Pass the response to parent component
      onQueryResponse(response);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { type: "bot", text: "Sorry, something went wrong." },
      ]);
    }
    setInput("");
  };

  const handlePromptSelect = (prompt) => {
    setInput(prompt);
  };

  const onEnterPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>Intelligent Data Chatbot</h3>
        <button onClick={onClose} aria-label="Close Chatbot">
          ✖
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <Message key={i} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <PromptSuggestions onSelect={handlePromptSelect} />
      <div className="chat-input-area">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onEnterPress}
          placeholder="Type your question here..."
          rows={2}
        />
        <button onClick={handleSend} aria-label="Send Message">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
