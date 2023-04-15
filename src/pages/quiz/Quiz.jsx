import React, { useState } from "react";
import "./Quiz.css";
import { Button, Container, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();
  const quizNumber = window.location.pathname.split(":")[1];
  const quizzes = useSelector((e) => e.quizzes.quizzes);
  const quiz = quizzes.find((q) => q.quiz_id === quizNumber);

  const [showModal, setShowModal] = useState(false);

  const handleStartQuiz = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Container className="text-center pt-4">
        <h1 className="quiz-heading mb-3">{quiz.title}</h1>
        <p className="mb-0">{quiz.description}</p>
        <div className="d-flex w-100 justify-content-center gap-3 mt-2">
          {quiz.tags.map((tag, index) => (
            <p key={index} className="m-0 mt-2 tag">
              {tag}
            </p>
          ))}
        </div>
        <Button id="play" className="mt-5" onClick={handleStartQuiz}>
          Start Quiz
        </Button>

        <Modal centered show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Start Quiz</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Start taking the quiz : {quiz.title}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              variant="success"
              onClick={() => navigate(`/startquiz/:${quiz.quiz_id}`)}
            >
              Start
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Quiz;
