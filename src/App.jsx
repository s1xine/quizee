import React, { useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import NotFound from "./pages/Others/NotFound";
import { PrivateRoute } from "./components/Privateroute";
import CreateQuiz from "./pages/quiz/CreateQuiz";
import { useDispatch } from "react-redux";
import { setUserState } from "./features/auth/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import ToastNotif from "./components/ToastNotif/ToastNotif";
import Quiz from "./pages/quiz/Quiz";
import YourQuizzes from "./pages/quiz/YourQuizzes";
import EditQuiz from "./pages/quiz/EditQuiz";
import StartQuiz from "./pages/quiz/StartQuiz";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUserState(user));
      } else {
        dispatch(setUserState(false));
      }
    });
  }, []);

  return (
    <>
      <ToastNotif />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />

        {/* Private routes to show only when the user is logged in */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="createquiz" element={<CreateQuiz />} />
          <Route path="quiz/:id" element={<Quiz />} />
          <Route path="startquiz/:id" element={<StartQuiz />} />
          <Route path="yourquizzes" element={<YourQuizzes />} />
          <Route path="editquiz/:id" element={<EditQuiz />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
