import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const prompts = [
  {
    text: "Show me total sales by product from sales_data.xlsx",
    icon: "📊",
  },
  {
    text: "Show me total order amounts by customer from the orders table",
    icon: "🧾",
  },
  {
    text: "List all customers aged above 30 from the customers table",
    icon: "👴",
  },
  {
    text: "Find customers from Canada with orders over $200",
    icon: "🇨🇦",
  },
  {
    text: "Show average order amount by country",
    icon: "🌎",
  },
  {
    text: "List customers who placed orders in the last 3 months",
    icon: "🕒",
  },
  {
    text: "Display order counts grouped by order status",
    icon: "📊",
  },
  {
    text: "Show customers with no orders",
    icon: "❌",
  },
];

const PromptSuggestions = ({ onSelect }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (prompt) => {
    onSelect(prompt);
    setOpen(false);
  };

  return (
    <div className="prompt-suggestions-fab-container">
      <AnimatePresence>
        {open && (
          <motion.div
            className="prompt-suggestions-overlay"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
          >
            {/* <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="suggestion-title"
            >
              Try one of these:
            </motion.p> */}
            <motion.div
              className="suggestions-grid"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 },
                },
              }}
            >
              {prompts.map((prompt, idx) => (
                <motion.button  
                  key={idx}
                  className="prompt-button"
                  onClick={() => handleSelect(prompt.text)}
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  whileHover={{ scale: 1.04, backgroundColor: "var(--primary-color)", color: "white" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="prompt-icon">{prompt.icon}</span>
                  <span className="prompt-text">{prompt.text}</span>
                </motion.button>
              ))}
            </motion.div>
            <button className="close-suggestions-btn" onClick={() => setOpen(false)} aria-label="Close suggestions">✖</button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className="prompt-suggestions-fab"
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.95 }}
        aria-label="Show suggestions"
        title="Try one of these"
      >
        💡 Try one of these
      </motion.button>
    </div>
  );
};

export default PromptSuggestions;
