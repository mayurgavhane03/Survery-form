import React from 'react';

const Welcome = ({ onStart }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our Shop Survey</h1>
        <button
          onClick={onStart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Start Survey
        </button>
      </div>
    </div>
  );
};

export default Welcome;
