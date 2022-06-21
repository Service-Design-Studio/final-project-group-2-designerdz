import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { API_URL } from "../utilities/constants.js";
import ProgressBar from "../components/ProgressBar.js";
import { Button, BackButton } from "../components/Buttons.js";
import TextDesc from "../components/TextDesc.js";
import { getUserData } from "../services/axiosUsers.js";

export default function Review() {
  const navigate = useNavigate();

  //TODO: get data from the past few pages
  useEffect(() => {
    let mounted = true;
    getUserData(API_URL)
      .then((items) => {
        if (mounted) {
          console.log(items);
          //data in json format
          // setCustomers(items);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => (mounted = false);
  }, []);

  //TODO: do on click handler to do sth???
  const onClick = () => {
    navigate("/");
  };

  return (
    // TODO: Get data from the past few pages and finish here
    <div>
      <div className="fixed top-0 right-0 left-0 h-16 bg-white w-screen z-10" />
      <div className="fixed flex flex-row top-0 left-0 right-0 z-50">
        <BackButton onClick={() => navigate("/passport")} />
        <ProgressBar percent="100%" />
      </div>
      <TextDesc headerText="Review your details" />

      <div className="absolute top-36 w-screen px-8">
        {/* TODO: Beautify this using className flex for the information posted*/}
        <div className="flex flex-col float-left space-y-2">
          <p>Display Name:</p>
          <p>Phone Number:</p>
          <p>Email:</p>
        </div>

        <div
          className="flex flex-col float-right space-y-2 text-right max-w-[55%] 
          text-ellipsis overflow-hidden whitespace-nowrap"
        >
          <p>some dp name</p>
          <p>some phone no</p>
          <p>some email</p>
        </div>
        {/* <div className="flex flex-col "> */}
        <div className="flex flex-row float-left mt-5 w-full justify-between">
          <b className="text-xl float-left">Passport</b>
          <b className="text-xl float-right">icon</b>
        </div>
        {/* </div> */}

        <div className="flex flex-col float-left clear-left space-y-2 mt-5">
          <p>Full Name:</p>
          <p>Passport Number:</p>
          <p>Passport Expiry:</p>
          <p>Nationality:</p>
          <p>Gender:</p>
          <p>Date of Birth:</p>
        </div>

        <div
          className="flex flex-col float-right space-y-2 text-right mt-5 
          max-w-[55%] text-ellipsis overflow-hidden whitespace-nowrap"
        >
          <p className="overflow-scroll">some full name i am typing</p>
          <p>some passport number</p>
          <p>some passport expiry</p>
          <p>some nationality</p>
          <p>some gender</p>
          <p>some date of birth</p>
        </div>
      </div>
      <div className="flex flex-col absolute w-screen bottom-0 mb-10 items-center">
        <Button
          id="next"
          className="absolute w-screen bottom-0"
          text="Submit"
          bgcolor="bg-red-500"
          hovercolor="hover:bg-red-700"
          onClick={() => {
            onClick();
          }}
        />
      </div>
    </div>
  );
}
