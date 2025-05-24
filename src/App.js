import React, { useState } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatWindow from "./components/ChatWindow";
import DataDisplay from "./components/DataDisplay";
import "./styles.css";

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [queryResults, setQueryResults] = useState(null);

  const handleQueryResponse = (response) => {
    if (response.data) {
      setQueryResults(response.data);
      setChatOpen(false); // Close the chat window when we have results
    }
  };

  return (
    <div className="App">
      <h1>Welcome to Intelligent Data Chatbot</h1>
      {/* Other home page content */}

      {/* Display query results in the main content area */}
      {queryResults && <DataDisplay data={queryResults} />}

      {chatOpen && <ChatWindow onClose={() => setChatOpen(false)} onQueryResponse={handleQueryResponse} />}
      {!chatOpen && <ChatbotIcon onClick={() => setChatOpen(true)} />}
    </div>
  );
}

export default App;
