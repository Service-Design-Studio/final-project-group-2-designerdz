import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../utilities/constants.js";
import ProgressBar from "../components/ProgressBar.js";
import { Button, BackButton } from "../components/Buttons.js";
import TextDesc from "../components/TextDesc.js";
import { getUserData } from "../services/axiosUsers.js";

let test_data;
export default function Review() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  useEffect(() => {
    let phone_number =localStorage.getItem("phone_number")
    phone_number = 91234567
    getUserData(API_URL, phone_number)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].phone_number == phone_number) {
            console.log("SUCCESSFULLY SET TEST_DATA")
            test_data = response.data[i];
            console.log(test_data)
          }
        }
        setDetails(test_data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submitData = () => {
    console.log("Success!")


    navigate("/success")
  }

  return (
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
          <p>{details.display_name}</p>
          <p>{details.phone_number}</p>
          <p>{details.email}</p>
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
          <p className="overflow-scroll"></p>
          <p>{details.full_name}</p>
          <p>{details.passport_no}</p>
          <p>{details.passport_expiry}</p>
          <p>{details.nationality}</p>
          <p>{details.gender}</p>
          <p>{details.dob}</p>
        </div>
      </div>
      <div className="flex flex-col absolute w-screen bottom-0 mb-10 items-center">
        <Button
          id="next"
          className="absolute w-screen bottom-0"
          text="Submit"
          bgcolor="bg-red-500"
          hovercolor="hover:bg-red-700"
          onClick={submitData}
        />
      </div>
    </div>
  );
}
