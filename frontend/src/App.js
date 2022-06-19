import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.js";
import Details from "./pages/Details.js";
import Passport from "./pages/Passport.js";
import Review from "./pages/Review.js";
import SignUp from "./pages/SignUp.js";
import Restore from "./pages/Restore.js";

export default function App() {
  const loggedIn = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="details" element={<Details />} />
        <Route path="passport" element={<Passport />} />
        <Route path="review" element={<Review />} />
        <Route path="restore" element={<Restore />} />
      </Routes>
    </BrowserRouter>
  );
}
