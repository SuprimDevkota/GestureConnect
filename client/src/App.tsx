import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import PageNotFound from "./components/PageNotFound";

import { setUser } from "./reducers/loggedUserReducer";

import { IRootState } from "./store";

import userService from "./services/user";

import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Notification from "./components/Notification";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userFromStorage = userService.getUser();
    dispatch(setUser(userFromStorage));
  }, [dispatch]);

  const loggedUser = useSelector((state: IRootState) => state.loggedUser);

  return (
    <div>
      <Navbar />

      <Notification />

      <Routes>
        <Route path="/" element={loggedUser ? <Home /> : <LandingPage />} />

        <Route
          path="/signup"
          element={loggedUser ? <Navigate to="/" /> : <SignupForm />}
        />

        <Route path="/login" element={<LoginForm />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
