import React from "react";

const prompts = [
  "Show me total sales by product from sales_data.xlsx",
  "What are the monthly revenues from SQL table 'orders'?",
  "List customers from SQL table 'customers' in USA",
  "Show me sales for Widget A",
];

const PromptSuggestions = ({ onSelect }) => (
  <div className="prompt-suggestions">
    <p>Try one of these:</p>
    {prompts.map((p, idx) => (
      <button key={idx} onClick={() => onSelect(p)} className="prompt-button">
        {p}
      </button>
    ))}
  </div>
);

export default PromptSuggestions;
