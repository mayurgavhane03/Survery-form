import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';
import SurveyForm from './components/SurveyForm';
import Summary from './components/Summary';

const questions = [
  'Q1. How satisfied are you with our products?',
  'Q2. How fair are the prices compared to similar retailers?',
  'Q3. How satisfied are you with the value for money of your purchase?',
  'Q4. On a scale of 1-10, how would you recommend us to your friends and family?',
  'Q5. What could we do to improve our service?',
];


const App = () => {
  const [customerAnswers, setCustomerAnswers] = useState({});

  const handleSurveySubmit = (answers) => {
    // Save answers to the database/local storage
    console.log('Answers submitted:', answers);
    setCustomerAnswers(answers);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome onStart={() => window.location.href = '/survey'} />} />
        <Route path="/survey" element={<SurveyForm questions={questions} onSubmit={handleSurveySubmit} />} />
        <Route path="/summary" element={<Summary answers={customerAnswers} />} />
      </Routes>
    </Router>
  );
};

export default App;
