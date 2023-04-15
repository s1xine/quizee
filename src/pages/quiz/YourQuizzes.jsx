import React, { useEffect } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setUserQuizzes } from "../../features/quiz/quizzesSlice";
import { db } from "../../firebase";
import { Card, Container } from "react-bootstrap";
import YourQuizDetails from "../../components/quiz/YourQuizDetails";

function YourQuizzes() {
  const dispatch = useDispatch();
  const userState = useSelector((e) => e.auth.userState);
  const userQuizzes = useSelector((e) => e.quizzes.userQuizzes);

  const userQuizzesHistory = async () => {
    const currUserId = userState.uid;
    const quizzes = query(
      collection(db, "quizzesCollection"),
      orderBy("createdOn", "desc"),
      where("createdBy", "==", currUserId)
    );

    const querySnapshot = await getDocs(quizzes);
    const list = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    dispatch(setUserQuizzes(list));
  };

  useEffect(() => {
    userQuizzesHistory();
  }, [userQuizzes]);

  return (
    <Container>
      <h1 className="text-center pt-3 display-3 mb-3">Your Quizzes</h1>

      <Card className="mt-4 p-3 shadow">
        <h5 className="mb-4">Quizzes created by you</h5>

        {userQuizzes.map((quiz) => {
          return (
            <YourQuizDetails
              key={quiz.quiz_id}
              {...quiz}
              quiz={quiz}
              userQuizzes={userQuizzes}
            />
          );
        })}
      </Card>
    </Container>
  );
}

export default YourQuizzes;
