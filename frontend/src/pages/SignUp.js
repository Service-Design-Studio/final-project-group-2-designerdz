import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { BackButton } from "../components/Buttons.js";
import ProgressBar from "../components/ProgressBar.js";
import TextDesc from "../components/TextDesc.js";
import { getUserData } from "../services/axiosRequests.js";

export default function Landing() {
  const navigate = useNavigate();

  function onClickSingle() {
    localStorage.setItem("is_family", false);
    navigate("/details");
  }

  function onClickFamily() {
    localStorage.setItem("is_family", true); //to know whether is multi-user registration throughout the process
    navigate("/details");
  }

  return (
    <div>
      <div className="flex flex-end">
        <BackButton onClick={() => navigate("/")} />
        <ProgressBar percent="0%" />
      </div>
      <TextDesc
        headerText="Setting up multiple accounts?"
        bodyText="Let us make it easier for your family"
      />

      <div className="flex flex-col absolute w-screen items-center top-0 bottom-0 m-auto place-content-center space-y-4 -z-50">
        <button
          className="next bg-gray-300 hover:bg-red-200 text-xl font-semibold h-40 rounded w-10/12"
          onClick={onClickSingle}
        >
          No, just for myself only
        </button>

        <button
          className="family-next bg-gray-300 hover:bg-red-200 text-xl font-semibold h-40 rounded w-10/12"
          onClick={onClickFamily}
        >
          Yes, for me and my children...
        </button>

        <p className="absolute bottom-24 mb-10 mx-8 w-10/12 ">
          Only have a little time? <br />
          Don't worry, as your <b>data will be saved at every step!</b>
        </p>
      </div>
    </div>
  );
}
