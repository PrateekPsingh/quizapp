import axios from "axios";

export const fetchQuestions = async () => {
  try {
    // Check if questions are already cached in sessionStorage
    const cachedQuestions = sessionStorage.getItem("quizQuestions");
    if (cachedQuestions) {
      return JSON.parse(cachedQuestions);
    }

    const response = await axios.get("https://opentdb.com/api.php?amount=15");
    const formattedQuestions = response.data.results.map((q) => ({
      question: q.question,
      options: [q.correct_answer, ...q.incorrect_answers].sort(() => Math.random() - 0.5),
      correctAnswer: q.correct_answer,
    }));

    // Cache the questions in sessionStorage
    sessionStorage.setItem("quizQuestions", JSON.stringify(formattedQuestions));
    console.log(formattedQuestions);
    return formattedQuestions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};
