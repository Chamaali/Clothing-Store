import React, { useState } from "react";
import ChatWidget from "./components/chat/ChatWidget";
import LandingPageBody from "./components/landing page/LandingPageBody";
import NavBar from "./components/navigationBar/NavBar";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <NavBar />
      <LandingPageBody />
      <button onClick={() => setIsChatOpen(!isChatOpen)}>Chat</button>
      {isChatOpen && <ChatWidget />}
    </>
  );
}

export default App;
