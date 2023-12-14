import React from 'react';

const Summary = ({ answers }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full md:max-w-md p-4">
        <h1 className="text-2xl font-bold mb-4">Survey Summary</h1>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Answers:</h2>
          <ul>
            {Object.entries(answers).map(([question, answer]) => (
              <li key={question} className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Q no. {parseInt(question) + 1}</h3>
                <p>{answer}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Summary;
