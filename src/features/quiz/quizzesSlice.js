import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const querySnapshot = await getDocs(collection(db, "quizzesCollection"));
let quizzesArray = [];
querySnapshot.forEach((doc) => {
  quizzesArray.push(doc.data());
});

const initialState = {
  quizzes: quizzesArray,
  userQuizzes: [],
};

export const quizzesSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setUserQuizzes: (state, action) => {
      state.userQuizzes = action.payload;
    },
  },
});

export const { setUserQuizzes, setCountDown } = quizzesSlice.actions;

export default quizzesSlice.reducer;
