import React, { useState } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatWindow from "./components/ChatWindow";
import DataDisplay from "./components/DataDisplay";
import "./styles.css";

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [queryResults, setQueryResults] = useState(null);
  const [chartData, setChartData] = useState(null);

  const handleQueryResponse = (response) => {
    console.log('Query Response received:', response);
    if (response.data) {
      console.log('Setting query results:', response.data);
      console.log('Setting chart data:', response.chart);
      setQueryResults(response.data);
      setChartData(response.chart);
      setChatOpen(false); // Close the chat window when we have results
    }
  };

  return (
    <div className="App">
      <h1>Welcome to Intelligent Data Chatbot</h1>
      {/* Other home page content */}

      {/* Display query results in the main content area */}
      {queryResults && <DataDisplay data={queryResults} chart={chartData} />}

      {chatOpen && <ChatWindow onClose={() => setChatOpen(false)} onQueryResponse={handleQueryResponse} />}
      {!chatOpen && <ChatbotIcon onClick={() => setChatOpen(true)} />}
    </div>
  );
}

export default App;
