import React, { useState } from "react";
import { Button, Modal, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

function YourQuizDetails({ quiz, userQuizzes }) {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const maxLength = 5;
  const truncatedTitle = quiz.title.split(" ").slice(0, maxLength).join(" ");
  const finalTitle =
    truncatedTitle + (quiz.title.length > maxLength ? "..." : "");

  const deleteQuiz = async (quizId) => {
    try {
      await deleteDoc(doc(collection(db, "quizzesCollection"), quizId));
      toast.success(`Quiz was deleted successfully.`);
    } catch (error) {
      toast.error(`Error deleting quiz with ID ${quizId}: ${error}`);
    }
  };

  return (
    <>
      <div className="card p-3 mb-4" style={{ backgroundColor: "#f1f3f5" }}>
        <div className="d-flex gap-4 justify-content-around">
          <p className="m-0 mr-2 flex-grow-1">
            <span className="fw-bold"> Quiz title:</span> {finalTitle}
          </p>
          <p className="m-0 mr-2">
            <span className="fw-bold">Created on: </span>
            {quiz.createdOn.toDate().toLocaleString()}
          </p>
          <div className="d-flex align-items-center">
            <i
              onClick={() => navigate(`/editquiz/:${quiz.quiz_id}`)}
              style={{ cursor: "pointer" }}
              className="fa-regular fa-pen-to-square  me-4"
            ></i>
            <i
              onClick={() => {
                setShowDeleteModal(true);
              }}
              style={{ cursor: "pointer", color: "red" }}
              className="fa-solid fa-trash me-2"
            ></i>
          </div>
        </div>
      </div>

      <Modal
        centered
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={() => {
              deleteQuiz(quiz.quiz_id);
              setShowDeleteModal(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default YourQuizDetails;
