import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.js";
import Details from "./pages/Details.js";
import Passport from "./pages/Passport.js";
import Review from "./pages/Review.js";
import SignUp from "./pages/SignUp.js";
import Success from "./pages/Success.js";
import Family from "./pages/Family.js";
import ChildDetails from "./pages/ChildDetails";
import Admin from "./pages/admin/Admin.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="details" element={<Details />} />
        <Route path="passport" element={<Passport />} />
        <Route path="review" element={<Review />} />
        <Route path="success" element={<Success />} />
        <Route path="family" element={<Family />} />
        <Route path="child" element={<ChildDetails />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
