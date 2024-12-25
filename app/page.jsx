// app/page.jsx

"use client";

import Chatbot from "../components/ChatBot";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Chatbot />
    </div>
  );
}
