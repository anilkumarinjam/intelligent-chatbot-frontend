import React from "react";

const Message = ({ message }) => {
  if (message.type === "user") {
    return <div className="message user-message">{message.text}</div>;
  }

  if (message.type === "bot") {
    return (
      <div className="message bot-message">
        <div>{message.text}</div>
        {message.chart && (
          <div className="chart-container" dangerouslySetInnerHTML={{ __html: message.chart }} />
          // Alternatively, parse chart JSON and use <Plot data={} layout={} />
        )}
      </div>
    );
  }

  return null;
};

export default Message;
