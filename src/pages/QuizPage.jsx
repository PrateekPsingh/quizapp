import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchQuestions } from "../utils/fetchQuestions";

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0.5 * 60); // 30 minutes in seconds
  const [questionStatus, setQuestionStatus] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(true); // For responsive navigation panel
  const [loading, setLoading] = useState(true); 

  const email = location.state?.email;

  useEffect(() => {
    const getQuestions = async () => {
      if (questions.length > 0) return; // Prevents API call if questions are already loaded
      setLoading(true);
      const fetchedQuestions = await fetchQuestions();
      setQuestions(fetchedQuestions);
      setQuestionStatus(
        fetchedQuestions.map(() => ({ visited: false, attempted: false }))
      );
      setLoading(false); // Set loading to false once data is fetched
    };

    getQuestions();
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));

    setQuestionStatus((prevStatus) =>
      prevStatus.map((status, index) =>
        index === currentQuestionIndex
          ? { ...status, visited: true, attempted: true }
          : status
      )
    );
  };

  const handleSubmit = () => {
    navigate("/result", {
      state: {
        selectedAnswers: { ...selectedAnswers },
        questions: [...questions],
        email,
      },
    });
  };

  useEffect(() => {
    if (!loading) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            handleSubmit(); // Submit the quiz when time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
  
      return () => clearInterval(timer); // Clean up the timer on unmount
    }
  }, [loading]); // Only start the timer after loading is false
  

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const navigateToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setQuestionStatus((prevStatus) =>
      prevStatus.map((status, i) =>
        i === index ? { ...status, visited: true } : status
      )
    );
  };

  if (loading) {
    return <div className="text-center mt-10">Loading questions...</div>;
  }


  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Navigation Panel */}
      <div
        className={`${
          isPanelOpen ? "w-full lg:w-1/4" : "w-0 lg:w-1/4"
        } bg-gray-200 p-4 transition-all duration-300 lg:block ${
          isPanelOpen ? "block" : "hidden"
        }`}
      >
        <h2 className="text-lg font-bold mb-4 flex justify-between">
          Question Overview
          <button
            className="lg:hidden text-red-500"
            onClick={() => setIsPanelOpen(false)}
          >
            Close
          </button>
        </h2>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToQuestion(index)}
              className={`w-10 h-10 rounded-full text-white font-bold ${
                questionStatus[index]?.attempted
                  ? "bg-green-500"
                  : questionStatus[index]?.visited
                  ? "bg-yellow-500"
                  : "bg-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle Navigation Button (For smaller screens) */}
      {!isPanelOpen && (
        <button
          onClick={() => setIsPanelOpen(true)}
          className="lg:hidden bg-blue-500 text-white px-4 py-2 rounded-md m-4"
        >
          Questions Navigation
        </button>
      )}

      {/* Quiz Section */}
      <div className="flex-grow p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Quiz</h1>
          <span className="text-red-500 font-bold">Time Left: {formatTime(timeLeft)}</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">
            Question {currentQuestionIndex + 1}/{questions.length}
          </h2>
          <p
            className="mb-6"
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          ></p>
          <div className="flex flex-col space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`px-4 py-2 rounded-lg ${
                  selectedAnswers[currentQuestionIndex] === option
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                } hover:bg-blue-400 transition`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition disabled:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={
              currentQuestionIndex === questions.length - 1
                ? handleSubmit
                : () => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))
            }
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
