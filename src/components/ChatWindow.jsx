import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Message from "./Message";
import PromptSuggestions from "./PromptSuggestions";
import { sendQuery } from "../api";

const TypingIndicator = () => (
  <motion.div 
    className="typing-indicator"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
  >
    <motion.div 
      className="typing-bubble"
      animate={{
        scale: [1, 1.2, 1],
        transition: {
          repeat: Infinity,
          duration: 1,
          repeatType: "loop",
          ease: "easeInOut"
        }
      }}
    >
      <span></span>
      <span></span>
      <span></span>
    </motion.div>
    <span className="typing-text">Working on it...</span>
  </motion.div>
);

const ChatWindow = ({ onClose, onQueryResponse }) => {
  const [messages, setMessages] = useState([
    { 
      type: "bot", 
      text: "Hi! I'm your intelligent data assistant. How can I help you analyze your data today?",
      timestamp: new Date()
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [inputHeight, setInputHeight] = useState("auto");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const simulateTyping = async (message) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    setIsTyping(false);
    setMessages(prev => [...prev, { 
      type: "bot", 
      text: message, 
      timestamp: new Date() 
    }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { 
      type: "user", 
      text: input.trim(), 
      timestamp: new Date() 
    };
    setMessages(msgs => [...msgs, userMessage]);
    setInput("");

    try {
      setIsTyping(true);
      const response = await sendQuery(input);
      console.log("[DEBUG] API response in ChatWindow:", response);
      setIsTyping(false);

      if (response.data) {
        const botMessage = {
          type: "bot",
          text: "Success! Here's the response:",
          timestamp: new Date()
        };
        setMessages(msgs => [...msgs, botMessage]);
        onQueryResponse(response);
      } else if (response.response) {
        // Fallback: show plain text response if no data property
        const botMessage = {
          type: "bot",
          text: "Success! Here's the response:",
          timestamp: new Date()
        };
        setMessages(msgs => [...msgs, botMessage]);
      }
    } catch (error) {
      setIsTyping(false);
      console.error("[DEBUG] API error in ChatWindow:", error);
      await simulateTyping("Sorry, I encountered an error while processing your request. Please try again.");
    }
  };

  const handlePromptSelect = (prompt) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const onEnterPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      className="chat-window glass-effect"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: "spring", bounce: 0.3 }}
    >
      {/* Always render header at the top */}
      <motion.div 
        className="chat-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="header-content">
          <h3>Data Assistant</h3>
          <span className="status-indicator">Online</span>
        </div>
        <button 
          onClick={onClose} 
          className="close-button"
          aria-label="Close Chatbot"
        >
          <span>✖</span>
        </button>
      </motion.div>

      <motion.div 
        className="chat-messages custom-scrollbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Message message={msg} />
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {isTyping && <TypingIndicator />}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </motion.div>

      <motion.div 
        className="chat-input-area"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onEnterPress}
          placeholder="Ask me about your data..."
          rows={1}
          className="custom-scrollbar"
          style={{ height: inputHeight }}
        />
        <motion.button
          onClick={handleSend}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!input.trim() || isTyping}
          className={`send-button ${!input.trim() || isTyping ? 'disabled' : ''}`}
          aria-label="Send Message"
        >
          {isTyping ? 'Processing...' : 'Send'}
        </motion.button>
      </motion.div>

      {/* Floating PromptSuggestions below input */}
      <PromptSuggestions onSelect={handlePromptSelect} />
    </motion.div>
  );
};

export default ChatWindow;
