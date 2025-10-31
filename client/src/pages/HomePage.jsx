import React, { useState } from 'react'
import InstagramStories from '../components/instagram stories/InstagramStories'
import CustomerTestimonial from '../components/testimonial/CustomerTestimonial'
import Footer from '../components/footer/Footer'
import SelectCategory from '../components/select cotegory/SelectCategory'
import NavBar from '../components/navigationBar/NavBar';
import ChatWidget from '../components/chat/ChatWidget'

function HomePage() {
    const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <div>
      <NavBar/>
      <div className='flex flex-col gap-40'>
        <SelectCategory />
        <InstagramStories />
        <CustomerTestimonial />
        <Footer />
        <button
        aria-label="Open chat"
        className="floating-chat-toggle"
        onClick={() => setIsChatOpen((s) => !s)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: 28,
          border: "none",
          backgroundColor: "#111827",
          color: "white",
          boxShadow: "0 6px 18px rgba(17,24,39,0.2)",
          cursor: "pointer",
          zIndex: 9999,
        }}
      >
        💬
      </button>

      {isChatOpen && <ChatWidget onClose={() => setIsChatOpen(false)} />}
      </div>
    </div>
  )
}

export default HomePage