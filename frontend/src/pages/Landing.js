import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/Buttons.js";
import Popup from "reactjs-popup";
import Restore from "./Restore.js";

export default function Landing() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      console.log(location.state.pop_up);
      setOpen(location.state.pop_up);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const closeModal = () => setOpen(false);

  return (
    <div
      className={`grid h-screen w-screen place-content-center px-8 ${
        open ? "bg-zinc-400 blur" : null
      }`}
    >
      <img
        className="mx-auto w-5/6 max-w-md"
        src="https://logos-download.com/wp-content/uploads/2016/12/DBS_Bank_logo_logotype.png"
        alt="DBS Logo"
      />
      <div className="relative mt-[80%]">
        <Button
          text="NOT A CUSTOMER YET?"
          bgColor="bg-red-500"
          hoverColor="hover:bg-red-700"
          onClick={() => navigate("/signup")}
        />
        <Button
          text="LOG IN"
          bgColor="bg-slate-600"
          hoverColor="hover:bg-slate-800"
          onClick={() => alert("Sorry we are not DBS!")}
        />
      </div>
      <button onClick={() => setOpen(true)} className="button">
        <a>
          Left registration midway? &nbsp;
          <span className="underline">Continue where you left.</span>
        </a>
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="w-fit mx-8">
          <Restore />
        </div>
      </Popup>
    </div>
  );
}
