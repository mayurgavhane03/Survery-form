import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Question from "./Question";

const SurveyForm = ({ questions, onSubmit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userResponse, setUserResponse] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const [showSubmitAlert, setShowSubmitAlert] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleAnswer = (response) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentIndex]: response,
    }));
    setUserResponse(response);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setUserResponse(""); // Clearing the input
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setUserResponse("");
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSkip = () => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentIndex]: null,
    }));

    if (currentIndex === questions.length - 1) {
      handleFinish(); // Finish the survey if it's the last question
    } else {
      handleNext(); // Move to the next question otherwise
    }
  };

  const handleFinish = () => {
    onSubmit(answers);
    navigate("/summary");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (currentIndex === questions.length - 1) {
      const answeredQuestions = Object.keys(answers).length;
      const totalQuestions = questions.length;

      if (answeredQuestions === totalQuestions) {
        handleFinish();
      } else {
        setShowSubmitAlert(true);
      }
    } else {
      handleNext();
    }
  };

  useEffect(() => {
    const answeredQuestions = Object.keys(answers).length;
    const totalQuestions = questions.length;

    setShowSubmit(answeredQuestions === totalQuestions);
  }, [answers, questions.length]);

  const handleCloseAlert = () => {
    setShowSubmitAlert(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleFormSubmit}>
        <div className="max-w-md w-full p-4 bg-white rounded shadow-md">
          <Question
            question={questions[currentIndex]}
            fileInputRef={fileInputRef}
            onAnswer={handleAnswer}
            userResponse={userResponse}
          />
          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Previous
            </button>
            <span className="text-gray-600">{`${currentIndex + 1}/${questions.length}`}</span>

            {currentIndex === questions.length - 1 ? (
              <button
                type="submit"
                disabled={!showSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            )}
            <button
              type="button"
              onClick={handleSkip}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Skip
            </button>
          </div>
        </div>
      </form>
      {showSubmitAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <p>Please answer all questions before submitting.</p>
            <button onClick={handleCloseAlert} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
