import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GET_USER_URL } from "../utilities/constants.js";
import ProgressBar from "../components/ProgressBar.js";
import { Button, BackButton, EditButton } from "../components/Buttons.js";
import TextDesc from "../components/TextDesc.js";
import { getUserData } from "../services/axiosUsers.js";
import { getMonthYear, getDateMonthYear } from "../utilities/dateHelper.js";

export default function Review() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  let userData;
  let phoneNumber = localStorage.getItem("phoneNumber");

  useEffect(() => {
    getUserData(GET_USER_URL, phoneNumber)
      .then((response) => {
        userData = response.data[0];
        setDetails(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submitData = () => {
    navigate("/success");
  };

  return (
    <div>
      <div className="fixed top-0 right-0 left-0 h-16 bg-white w-screen z-10" />
      <div className="fixed flex flex-row top-0 left-0 right-0 z-50">
        <BackButton onClick={() => navigate("/passport")} />
        <ProgressBar percent="100%" />
      </div>
      <TextDesc headerText="Review your details" />

      <div className="absolute top-36 w-full px-8">
        <div className="grid grid-cols-2 mt-6">
          <b className="text-xl">Basic Information</b>
          <b className="text-xl text-right">
            <EditButton
              onClick={() => navigate("/details", { state: { onEdit: true } })} //pass onEdit param to page
            />
          </b>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <p>Display Name:</p>
          <p className="text-right">
            {details === undefined ? "" : details.display_name}
          </p>
          <p>Phone Number:</p>
          <p className="text-right">
            {details === undefined ? "" : details.phone_number}
          </p>
          <p>Email</p>
          <p className="text-right">
            {details === undefined ? "" : details.email}
          </p>
        </div>

        <div className="grid grid-cols-2 mt-6">
          <b className="text-xl">Passport</b>
          <b className="text-xl text-right">
            <EditButton
              onClick={() => navigate("/passport", { state: { onEdit: true } })} //pass onEdit param to page
            />
          </b>
        </div>

        <div className="grid grid-cols-2 gap-4 ">
          <p>Full Name:</p>
          <p className="review_fn text-right">
            {details === undefined ? "" : details.full_name}
          </p>
          <p>Passport Number:</p>
          <p className="text-right">
            {details === undefined ? "" : details.passport_no}
          </p>
          <p>Passport Expiry:</p>
          <p className="text-right">
            {details === undefined ? "" : getMonthYear(details.passport_expiry)}
          </p>
          <p>Nationality:</p>
          <p className="text-right">
            {details === undefined ? "" : details.nationality}
          </p>
          <p>Gender:</p>
          <p className="text-right">
            {details === undefined ? "" : details.gender}
          </p>
          <p>Date of Birth:</p>
          <p className="text-right">
            {details === undefined ? "" : getDateMonthYear(details.dob)}
          </p>
        </div>
        <Button
          className="mt-28"
          name="next"
          text="Submit"
          bgColor="bg-red-500"
          hoverColor="hover:bg-red-700"
          onClick={submitData}
        />
      </div>
    </div>
  );
}
