import React, { useState, useEffect } from 'react';
import Question from './Question';
import he from 'he'; // Import the 'he' library for decoding HTML entities
import '../App.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [scores, setScores] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then((response) => response.json())
      .then((data) => setQuestions(data.results.map(decodeQuestion))) // Decode HTML entities in each question
      .catch((error) => console.log(error));
  }, []);

  const decodeQuestion = (questionData) => {
    // Decode the HTML entities in the question data
    return {
      ...questionData,
      question: he.decode(questionData.question),
      correct_answer: he.decode(questionData.correct_answer),
      incorrect_answers: questionData.incorrect_answers.map(he.decode),
    };
  };

  const handleOptionClick = (option) => {
    if (selectedOptions.length === 0) {
      setSelectedOptions([option]);
    }
  };

  useEffect(() => {
    if (selectedOptions.length > 0) {
      const currentQuestionCorrectAnswer = he.decode(questions[currentQuestion].correct_answer); // Decode the correct answer
      if (selectedOptions.includes(currentQuestionCorrectAnswer)) {
        setScores((prevScores) => [...prevScores, 1]);
      } else {
        setScores((prevScores) => [...prevScores, 0]);
      }
      setTimeout(() => {
        setSelectedOptions([]);
        if (currentQuestion === questions.length - 1) {
          setQuizCompleted(true);
        } else {
          setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        }
      }, 1000); // Delay for 1 second before moving to the next question or completing the quiz
    }
  }, [selectedOptions, currentQuestion, questions]);

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOptions([]);
    setScores([]);
    setQuizCompleted(false);
  };

  const totalScore = scores.reduce((acc, score) => acc + score, 0);

  return (
    <div className="quiz">
      {questions.length > 0 && currentQuestion < questions.length && !quizCompleted ? (
        <>

          <div className="question-info">
            
            <p>Question {currentQuestion + 1}/{questions.length}</p>
            <Question
              question={questions[currentQuestion].question}
              options={[
                ...questions[currentQuestion].incorrect_answers,
                questions[currentQuestion].correct_answer,
              ]}
              selectedOptions={selectedOptions}
              handleOptionClick={handleOptionClick}
            />
          </div>


   



        </>
      ) : (
        <div>
          {quizCompleted ? (
            <>
            <div className="score">
              <h2>Quiz Completed!</h2>
              <p>Your Final Score is: {totalScore}</p>
              <button onClick={handleRestartQuiz}>Restart Quiz</button>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;

