import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import "./QuizCard.css";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ quiz }) => {
  const navigate = useNavigate();

  const maxLength = 15;
  const truncatedDescription = quiz.description
    .split(" ")
    .slice(0, maxLength)
    .join(" ");
  const finalDescription =
    truncatedDescription + (quiz.description.length > maxLength ? "..." : "");

  return (
    <>
      <Card className="p-3 mb-4 quiz-card">
        <Row>
          <Col md={8} sm={8}>
            <h4>{quiz.title}</h4>

            <p className="m-0">{finalDescription}</p>
            <div className="d-flex gap-3 mt-2">
              {quiz.tags.map((tag, index) => (
                <p key={index} className="m-0 mt-2 tag">
                  {tag}
                </p>
              ))}
            </div>
          </Col>

          <Col md={4} sm={4} className="quiz-details">
            <p className="m-0">
              <span className="fw-bold">Questions:</span> {quiz.noOfQuestions}
            </p>

            <p className="m-0">
              <span className="fw-bold"> Duration:</span> {quiz.duration} mins
            </p>

            <p className="m-0">
              <span className="fw-bold">Points: </span>
              {quiz.points === "Points" ? "100 Points" : `${quiz.points}`}
            </p>

            <Button onClick={() => navigate(`/quiz/:${quiz.quiz_id}`)}>
              Know More
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default QuizCard;
