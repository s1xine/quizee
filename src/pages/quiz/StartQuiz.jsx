import React, { useState, useEffect } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./StartQuiz.css";

const StartQuiz = () => {
  const dispatch = useDispatch();
  const quizNumber = window.location.pathname.split(":")[1];
  const quizzes = useSelector((e) => e.quizzes.quizzes);
  const quiz = quizzes.find((q) => q.quiz_id === quizNumber);

  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(0);
  const [countdown, setCountdown] = useState(quiz.duration * 60); // duration is in minutes
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const currentQuestion = quiz.quizQuestions[currentQuestionIndex];

  // Countdown timer function
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  //to auto submit the quiz data
  useEffect(() => {
    const timerId = setTimeout(() => {
      setQuizCompleted(true);
    }, countdown * 1000);
    return () => clearTimeout(timerId);
  }, [countdown]);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected Option: ", selectedOption);

    // Check if selected option is correct and update score
    if (selectedOption === currentQuestion.correctOption) {
      setScore(score + 1);
    }

    // Move to next question or complete the quiz
    if (currentQuestionIndex + 1 === quiz.quizQuestions.length) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  useEffect(() => {
    if (quiz.points === "Percentage") {
      const percentage = (score / quiz.quizQuestions.length) * 100;
      setPoints(percentage.toFixed(1).replace(/\.0$/, ""));
    } else {
      const perQuestion = 100 / quiz.quizQuestions.length;
      const totalPoints = score * perQuestion;
      setPoints(totalPoints.toFixed(1).replace(/\.0$/, ""));
    }
  }, [score, quiz.points, quiz.quizQuestions.length]);

  if (quizCompleted) {
    return (
      <Container className="d-flex justify-content-center">
        <Card className="p-3 mt-5" style={{ maxWidth: "800px", width: "100%" }}>
          <div className="d-flex justify-content-between">
            <div>
              <h3>Quiz Completed</h3>
              <p>Congratulations! You have completed the quiz.</p>

              <p>
                Your score: <strong>{score}</strong> out of{" "}
                {quiz.quizQuestions.length}
              </p>
            </div>

            <div className="align-self-center">
              <p className="display-3">
                {points}
                {quiz.points === "Percentage" ? "%" : "/100"}
              </p>
            </div>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-center display-3 mb-5 mt-4">{quiz.title}</h1>

      <Card className="p-3 mt-4">
        <h3 className="mb-3">
          <span style={{ fontSize: "35px" }}>Q{currentQuestionIndex + 1}.</span>{" "}
          {currentQuestion.question}
        </h3>

        <form onSubmit={handleSubmit}>
          <Row className=" mb-3">
            {currentQuestion.options.map((option, index) => (
              <Col key={index} md={6} id="options">
                <p className="mb-1">{index + 1}:</p>
                <input
                  type="radio"
                  id={`option${index}`}
                  name="option"
                  value={option}
                  onChange={() => handleOptionSelect(index)}
                  checked={selectedOption === index}
                />
                <label htmlFor={`option${index}`} className="ms-2">
                  {option}
                </label>
              </Col>
            ))}
          </Row>

          <div className="text-center">
            {currentQuestionIndex > 0 && (
              <Button
                variant="secondary"
                type="button"
                onClick={handlePrevQuestion}
                className="me-2"
              >
                Previous Question
              </Button>
            )}

            <Button
              variant="success"
              type="submit"
              disabled={selectedOption === null}
            >
              {currentQuestionIndex + 1 === quiz.quizQuestions.length
                ? "Finish"
                : "Next Question"}
            </Button>
          </div>
        </form>

        <div className=" text-end mt-2">
          <p className="fw-bold mb-0">
            Time Left:{" "}
            <span className="fw-normal">
              {Math.floor(countdown / 60)
                .toString()
                .padStart(2, "0")}
              :
              {Math.floor(countdown % 60)
                .toString()
                .padStart(2, "0")}
            </span>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default StartQuiz;
