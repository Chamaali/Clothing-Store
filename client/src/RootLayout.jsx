import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/navigationBar/NavBar';
import ChatWidget from './components/chat/ChatWidget';

export default function RootLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <NavBar />
      <Outlet />

      <button
        aria-label="Open chat"
        className="floating-chat-toggle"
        onClick={() => setIsChatOpen((s) => !s)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: 28,
          border: 'none',
          backgroundColor: '#111827',
          color: 'white',
          boxShadow: '0 6px 18px rgba(17,24,39,0.2)',
          cursor: 'pointer',
          zIndex: 9999,
        }}
      >
        💬
      </button>

      {isChatOpen && <ChatWidget onClose={() => setIsChatOpen(false)} />}
    </>
  );
}
