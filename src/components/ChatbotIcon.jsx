import React from "react";

const ChatbotIcon = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      fontSize: "30px",
      zIndex: 1000,
    }}
    aria-label="Open Chatbot"
  >
    💬
  </button>
);

export default ChatbotIcon;
