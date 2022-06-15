import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.js';
import Details from './pages/Details.js';
import Passport from './pages/Passport.js';
import Review from './pages/Review.js';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}>
        <Route path="/details" element = {<Details/>}/>
        <Route path="/passport" element = {<Passport/>}/>
        <Route path="/review" element = {<Review/>}/>
        </ Route>
      </Routes>
    </BrowserRouter>
  );
}