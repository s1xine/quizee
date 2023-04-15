import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import quizzesReducer from "../features/quiz/quizzesSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  quizzes: quizzesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

// export const store = configureStore({
//   reducer: { auth: authRedcuer },
// });
