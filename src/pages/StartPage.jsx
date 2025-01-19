import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!email) {
      alert("Please enter your email!");
      return;
    }
    navigate("/quiz", { state: { email } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Welcome to the Quiz</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-72 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleStart}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default StartPage;
