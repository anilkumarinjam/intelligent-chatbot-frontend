import React, { useState } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatWindow from "./components/ChatWindow";
import "./styles.css";

function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="App">
      <h1>Welcome to Intelligent Data Chatbot</h1>
      {/* Other home page content */}

      {chatOpen && <ChatWindow onClose={() => setChatOpen(false)} />}
      {!chatOpen && <ChatbotIcon onClick={() => setChatOpen(true)} />}
    </div>
  );
}

export default App;
