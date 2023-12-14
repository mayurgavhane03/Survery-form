import React, { useState } from "react";

const Question = ({ question, onAnswer, fileInputRef, userResponse }) => {
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    if (/^\d{0,2}$/.test(inputValue)) {
      const numericValue = parseInt(inputValue, 10);

      if (numericValue > 10) {
        setError("Number should not be greater than 10");
      } else {
        setError("");
        onAnswer(inputValue);
      }
    } else {
      setError("Please enter a valid numeric value");
    }

    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md p-8 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">{question}</h2>
        <input
          type="text"
          placeholder="Give the Rating Out 10"
          value={userResponse}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Question;
