import React from "react";
import { motion } from "framer-motion";
import Plot from "react-plotly.js";

const Message = ({ message }) => {
  const messageVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  const formatTimestamp = (date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  if (message.type === "user") {
    return (
      <motion.div 
        className="message user-message"
        variants={messageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        layout
        style={{ background: 'none', boxShadow: 'none', border: 'none' }} // Remove outer box
      >
        <motion.div 
          className="message-content"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {message.text}
        </motion.div>
        <div className="message-timestamp">
          {formatTimestamp(message.timestamp)}
        </div>
      </motion.div>
    );
  }

  if (message.type === "bot") {
    return (
      <motion.div 
        className="message bot-message"
        variants={messageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        layout
        style={{ background: 'none', boxShadow: 'none', border: 'none' }} // Remove outer box
      >
        <div className="message-avatar">🤖</div>
        <div className="message-body">
          <motion.div 
            className="message-content"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="message-text">{message.text}</div>
            {message.chart && (
              <motion.div 
                className="chart-container"
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: 1, 
                  height: "auto",
                  transition: {
                    duration: 0.5,
                    ease: "easeOut"
                  }
                }}
              >
                {typeof message.chart === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: message.chart }} />
                ) : (
                  <Plot
                    data={message.chart.data}
                    layout={{
                      ...message.chart.layout,
                      autosize: true,
                      height: 300,
                      width: null,
                      margin: { t: 20, b: 30, l: 50, r: 20 },
                      paper_bgcolor: 'transparent',
                      plot_bgcolor: 'transparent',
                      font: {
                        family: 'Inter, sans-serif',
                        color: 'var(--text-color)'
                      },
                      modebar: {
                        bgcolor: 'transparent',
                        color: 'var(--text-color)',
                        activecolor: 'var(--primary-color)'
                      }
                    }}
                    config={{
                      responsive: true,
                      displayModeBar: 'hover',
                      displaylogo: false,
                      modeBarButtonsToRemove: [
                        'sendDataToCloud',
                        'autoScale2d',
                        'resetScale2d'
                      ]
                    }}
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      borderRadius: '0.5rem',
                      overflow: 'hidden'
                    }}
                    useResizeHandler={true}
                    className="plot-wrapper"
                  />
                )}
              </motion.div>
            )}
          </motion.div>
          <div className="message-timestamp">
            {formatTimestamp(message.timestamp)}
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
};

export default Message;
