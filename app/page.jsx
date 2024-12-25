// app/page.jsx

"use client";

// import Chatbot from "../components/ChatBot";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center">
      {/* <Chatbot /> */}
      <h1 className="text-4xl font-semibold mb-6">Hello, stopped rn. Contact Guru!</h1>

      <Link href="https://guru-krithick.vercel.app/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-6 transition-all transform hover:scale-105">
          Contact Me
        </button>
      </Link>
    </div>
  );
}
