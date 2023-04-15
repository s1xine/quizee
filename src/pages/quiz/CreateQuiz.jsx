import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Badge,
  Card,
} from "react-bootstrap";
import "./Quiz.css";
import QuizInputForm from "../../components/quiz/QuizInputForm";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const CreateQuiz = () => {
  const userState = useSelector((e) => e.auth.userState);
  const navigate = useNavigate();
  const [quizName, setQuizName] = useState("");
  const [description, setDescription] = useState("");
  const [gradingSystem, setGradingSystem] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctOption: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleTagsChange = (event) => {
    const selectedTag = event.target.value;
    if (!tagsList.includes(selectedTag)) {
      setTagsList([...tagsList, selectedTag]);
    }
    event.target.selectedIndex = 0; // reset select to first option
  };

  const handleTagRemove = (tagToRemove) => {
    setTagsList(tagsList.filter((tag) => tag !== tagToRemove));
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (index, optionIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[index].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].correctOption = parseInt(event.target.value);
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestions = [...questions];
    newQuestions.push({
      question: "",
      options: ["", "", "", ""],
      correctOption: "",
    });
    setQuestions(newQuestions);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if quiz name is at least 3 characters long
    if (quizName.length < 3) {
      toast.error("Quiz name must be at least 3 characters long.");
      return;
    }

    // Check if description is at least 10 characters long
    if (description.length < 10) {
      toast.error("Description must be at least 10 characters long.");
      return;
    }

    // Check if grading system is selected
    if (!gradingSystem) {
      toast.error("Please select a grading system.");
      return;
    }

    // Check if time limit is a number between 1 and 180
    if (isNaN(timeLimit) || timeLimit < 0 || timeLimit > 181) {
      toast.error("Time limit must be a number between 1 and 180.");
      return;
    }

    if (tagsList.length === 0) {
      toast.error("Please select at least one tag.");
      setLoading(false);
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const { question, options, correctOption } = questions[i];
      if (question.trim().length === 0) {
        toast.error(`Question ${i + 1} cannot be empty.`);
        return;
      }

      for (let j = 0; j < options.length; j++) {
        if (options[j].trim().length === 0) {
          toast.error(`Option ${j + 1} of question ${i + 1} cannot be empty.`);
          return;
        }
      }

      if (
        !Number.isInteger(correctOption) ||
        correctOption < 0 ||
        correctOption > options.length
      ) {
        toast.error(`Please select a correct option for question ${i + 1}.`);
        return;
      }
    }

    try {
      setLoading(true);
      if (questions.length >= 5) {
        const quizData = {
          title: quizName,
          description: description,
          points: gradingSystem,
          duration: timeLimit,
          tags: tagsList,
          quizQuestions: questions,
          noOfQuestions: questions.length,
          createdOn: serverTimestamp(),
          createdBy: userState.uid,
        };
        const docRef = collection(db, "quizzesCollection");
        const quizRef = await addDoc(docRef, quizData);
        await updateDoc(quizRef, { quiz_id: quizRef.id });

        await updateDoc(doc(db, "usersdetails", userState.uid), {
          quiz_id: arrayUnion(quizRef.id),
        });

        toast.success("Quizz created successfully.");
        navigate(0);
        navigate("/yourquizzes");
      } else {
        toast.error("Please add at least 5 questions.");
        return;
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="text-center pt-3 display-3 mb-3">Create Quiz</h1>
      <div className="d-flex justify-content-center mb-5">
        <Card className="p-4 shadow" style={{ width: "700px" }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2" controlId="quizName">
              <Form.Label className="mb-1">Quiz Name</Form.Label>
              <Form.Control
                type="text"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                autoComplete="off"
                required
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="description">
              <Form.Label className="mb-1">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="off"
                required
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="gradingSystem">
              <Form.Label className="mb-1">Grading System</Form.Label>
              <Form.Select
                value={gradingSystem}
                onChange={(e) => setGradingSystem(e.target.value)}
                autoComplete="off"
                required
              >
                <option disabled value="">
                  Select a grading system
                </option>
                <option value="Percentage">Percentage</option>
                <option value="Points">Points (out off 100)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2" controlId="timeLimit">
              <Form.Label className="mb-1">Time Limit (minutes)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="180"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                autoComplete="off"
                required
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="tagslist">
              <Form.Label className="mb-1">Tags</Form.Label>
              <Form.Select value="" onChange={handleTagsChange}>
                <option disabled value="">
                  Select tags
                </option>
                <option disabled={tagsList.includes("World")} value="World">
                  World
                </option>
                <option disabled={tagsList.includes("Science")} value="Science">
                  Science
                </option>
                <option
                  disabled={tagsList.includes("Programming")}
                  value="Programming"
                >
                  Programming
                </option>
                <option disabled={tagsList.includes("History")} value="History">
                  History
                </option>
                <option
                  disabled={tagsList.includes("Mathematics")}
                  value="Mathematics"
                >
                  Mathematics
                </option>
                <option
                  disabled={tagsList.includes("General Knowledge")}
                  value="General Knowledge "
                >
                  General Knowledge
                </option>
                <option disabled={tagsList.includes("Other")} value="Other">
                  Other
                </option>
              </Form.Select>
            </Form.Group>

            {tagsList.length > 0 && (
              <div>
                {tagsList.map((tag) => (
                  <Badge bg="warning" text="dark" key={tag} className="me-2">
                    {tag}
                    <button
                      type="button"
                      className="btn-close ms-2"
                      onClick={() => handleTagRemove(tag)}
                    ></button>
                  </Badge>
                ))}
              </div>
            )}

            <h3 className="mt-5 mb-4">Questions</h3>
            {questions.map((question, index) => (
              <div className="mb-5" key={index}>
                <QuizInputForm
                  questions={questions}
                  question={question.question}
                  options={question.options}
                  correctOption={question.correctOption}
                  handleQuestionChange={(event) =>
                    handleQuestionChange(index, event)
                  }
                  handleOptionChange={(optionIndex, event) =>
                    handleOptionChange(index, optionIndex, event)
                  }
                  handleCorrectOptionChange={(event) =>
                    handleCorrectOptionChange(index, event)
                  }
                  handleRemoveQuestion={() => handleRemoveQuestion(index)}
                  index={index}
                />
              </div>
            ))}

            <Button variant="success" onClick={handleAddQuestion}>
              <i className=" fa-solid fa-plus fa-s"></i> Add Question
            </Button>

            <div className="text-center mb-4">
              <Button
                variant="dark"
                type="submit"
                className="mt-2"
                id="play"
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Create Quiz"
                )}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default CreateQuiz;
