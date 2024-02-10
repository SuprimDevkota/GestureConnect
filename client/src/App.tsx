import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SignupForm from "./components/SignupForm";
import PageNotFound from "./components/PageNotFound";

export default function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/signup" element={<SignupForm />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
