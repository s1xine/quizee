import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export const QuizInputForm = ({
  questions,
  question,
  options,
  correctOption,
  handleQuestionChange,
  handleOptionChange,
  handleCorrectOptionChange,
  handleRemoveQuestion,
  index,
}) => {
  return (
    <>
      <Form.Group className="mb-2" controlId={`formQuizQuestion${index}`}>
        <Form.Label>
          <div className="d-flex align-items-center">
            <h3 className="mb-0 fs-4 f-bold me-2">{`${
              index + 1
            } Quiz Question`}</h3>
            {questions.length > 1 && (
              <i
                className="fa-solid fa-trash"
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => handleRemoveQuestion(index)}
              ></i>
            )}
          </div>
        </Form.Label>
        <Form.Control
          type="text"
          value={question}
          onChange={handleQuestionChange}
          autoComplete="off"
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Options:</Form.Label>
        <Row>
          {[0, 1, 2, 3].map((optionIndex) => (
            <Col key={optionIndex} xs={6}>
              <div className="d-flex align-items-center">
                <p className="mb-3 me-2">{`${optionIndex + 1}:`}</p>
                <Form.Control
                  type="text"
                  className="mb-3"
                  value={options[optionIndex]}
                  onChange={(event) => handleOptionChange(optionIndex, event)}
                  autoComplete="off"
                />
              </div>
            </Col>
          ))}
        </Row>
      </Form.Group>

      <Form.Group className="mb-2" controlId={`formQuizCorrectOption${index}`}>
        <Form.Label>Correct Option:</Form.Label>
        <Form.Control
          as="select"
          value={correctOption}
          onChange={handleCorrectOptionChange}
          autoComplete="off"
        >
          <option value={null}>Select an option</option>
          {[0, 1, 2, 3].map((optionIndex) => (
            <option key={optionIndex} value={optionIndex}>
              {`Option ${optionIndex + 1}`}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </>
  );
};

export default QuizInputForm;
