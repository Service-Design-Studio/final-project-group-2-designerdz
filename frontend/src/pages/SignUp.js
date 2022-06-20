import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackButton } from "../components/Buttons.js";
import { API_URL } from "../utilities/constants.js";
import ProgressBar from "../components/ProgressBar.js";
import TextDesc from "../components/TextDesc.js";
import Customers from "../components/Customers.js";

//get customer info at signUp page, show popup to continue if cookies exist
function getAPIData() {
  return axios.get(API_URL).then((response) => response.data);
}

export default function Landing() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    let mounted = true;
    getAPIData()
      .then((items) => {
        if (mounted) {
          setCustomers(items);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <BackButton onClick={() => navigate(-1)} />
      <ProgressBar percent="0%" />
      <TextDesc
        headerText="Setting up multiple accounts?"
        bodyText="Let us make it easier for your family"
      />

      <div className="flex flex-col absolute w-screen bottom-0 top-0 items-center place-content-center space-y-4">
        <button 
          className="next bg-slate-500 text-xl font-semibold h-40 rounded w-10/12"
          onClick={() => navigate("/details")}
        >
          No, just for myself only
        </button>

        {/* TODO: Add feature into another page here once multi-user is out */}
        <button
          className="bg-slate-500 text-xl font-semibold h-40 rounded w-10/12"
          onClick={() => navigate("/details")}
        >
          Yes, for me and my children...
        </button>
      </div>
      <p className="absolute bottom-0 mb-10 mx-8 w-10/12 ">
        Only have a bit of time bla bla Only have a bit of time bla bla Only
        have a bit of time bla bla Only have a bit of time bla bla
      </p>
    </div>
  );
}
