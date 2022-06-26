import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { BackButton } from "../components/Buttons.js";
import { USER_URL } from "../utilities/constants.js";
import ProgressBar from "../components/ProgressBar.js";
import TextDesc from "../components/TextDesc.js";
import { getUserData } from "../services/axiosUsers.js";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    getUserData(USER_URL)
      .then((items) => {
        if (mounted) {
          // setCustomers(items);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => (mounted = false);
  }, []);

  function onClick() {
    localStorage.setItem("isFamily", true);
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
          onClick={() => navigate("/details")}
        >
          No, just for myself only
        </button>

        {/* TODO: Add feature into another page here once multi-user is out */}
        <button
          className="bg-gray-300 hover:bg-red-200 text-xl font-semibold h-40 rounded w-10/12"
          onClick={onClick}
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
