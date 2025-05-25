import React from "react";
import { motion } from "framer-motion";

const ChatbotIcon = ({ onClick }) => {
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: [
        "0 4px 8px rgba(0,0,0,0.2)",
        "0 8px 16px rgba(37, 99, 235, 0.3)",
        "0 4px 8px rgba(0,0,0,0.2)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <motion.button
      onClick={onClick}
      className="chatbot-icon"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        ...pulseVariants.pulse,
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 8px 16px rgba(37, 99, 235, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "var(--primary-color)",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "28px",
        zIndex: 1000,
      }}
      aria-label="Open Chatbot"
    >
      <motion.span
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        💬
      </motion.span>
    </motion.button>
  );
};

export default ChatbotIcon;
