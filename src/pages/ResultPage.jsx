import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the data passed from QuizPage
  const { selectedAnswers, questions, email } = location.state || {};

  if (!questions || !selectedAnswers) {
    return <div className="text-center mt-10">No results to display. Please take the quiz first.</div>;
  }

  // Calculate the score
  const score = questions.reduce((total, question, index) => {
    if (selectedAnswers[index] === question.correctAnswer) {
      return total + 1;
    }
    return total;
  }, 0);

  // Navigate back to the start page
  const handleRetake = () => {
    navigate("/");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Quiz Results</h1>
      <p className="text-lg mb-8">
        Thank you for taking the quiz, <span className="font-semibold">{email || "User"}</span>!
      </p>
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Your Score: {score}/{questions.length}</h2>
        <div className="divide-y divide-gray-300">
          {questions.map((question, index) => (
            <div key={index} className="py-4">
              <p className="font-semibold">
                Q{index + 1}: <span dangerouslySetInnerHTML={{ __html: question.question }}></span>
              </p>
              <p>
                <span className="font-medium">Your Answer:</span>{" "}
                <span
                  className={
                    selectedAnswers[index] === question.correctAnswer
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {selectedAnswers[index] || "No Answer"}
                </span>
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Correct Answer:</span>{" "}
                {question.correctAnswer}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleRetake}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Retake Quiz
      </button>
    </div>
  );
};

export default ResultPage;
