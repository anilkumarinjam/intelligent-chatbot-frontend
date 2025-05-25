import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatWindow from "./components/ChatWindow";
import DataDisplay from "./components/DataDisplay";
import ThemeToggle from "./components/ThemeToggle";
import Hero from "./sections/Hero";
import "./styles/main.scss";

function App() {
  const [chatOpen, setChatOpen] = useState(true);
  const [queryResults, setQueryResults] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
``
  useEffect(() => {
    const timer = setTimeout(() => {
      setChatOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleQueryResponse = (response) => {
    console.log("[DEBUG] handleQueryResponse response:", response);
    if (response.data) {
      setQueryResults(response.data);
      setChartData(response.chart);
    }
  };

  const closeResults = () => {
    setQueryResults(null);
    setChartData(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <motion.div 
      className="App"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} /> */}
      <Hero />
      
      <AnimatePresence>
        {queryResults && (
          <>
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeResults}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
                zIndex: 1050
              }}
            />
            <DataDisplay 
              data={queryResults} 
              chart={chartData} 
              onClose={closeResults}
              isDark={isDarkMode}
            />
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            <ChatWindow 
              onClose={() => setChatOpen(false)} 
              onQueryResponse={handleQueryResponse}
              isDark={isDarkMode}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {!chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            <ChatbotIcon onClick={() => setChatOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default App;
