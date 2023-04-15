import React from "react";
import QuizCard from "../../components/Home/QuizCard";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const quizzes = useSelector((e) => e.quizzes.quizzes);

  return (
    <Container className="mt-3">
      <h1 className="text-center display-3 mb-3">Quizzes</h1>

      <Row>
        <Col lg={9} md={9}>
          {quizzes.map((quiz) => {
            return <QuizCard key={quiz.quiz_id} quiz={quiz} />;
          })}
        </Col>

        <Col lg={3} md={3}>
          <div className="d-flex justify-content-center mb-4">
            <NavLink to="/createquiz">
              <Button variant="dark" className="ps-3 pe-3 ">
                <i className="m-0 p-0 nav-icons fa-solid fa-plus fa-lg"></i>{" "}
                Create Quiz
              </Button>
            </NavLink>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
