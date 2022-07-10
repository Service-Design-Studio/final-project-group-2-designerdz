import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar.js";
import { Button, BackButton, EditButton } from "../components/Buttons.js";
import TextDesc from "../components/TextDesc.js";
import { getAllChildrenData } from "../services/axiosRequests.js";
import { getMonthYear, getDateMonthYear } from "../utilities/dateHelper.js";
import Carousel from "../components/Carousel";

export default function Review() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [familyData, setFamilyData] = useState([]);
  let userData;
  let userId = localStorage.getItem("user_id");
  let isFamily = localStorage.getItem("is_family") === "true";

  //TODO: delete mock data after testings, to simulate how response.data would look like
  let testFamilyArray = [
    {
      full_name: "test1",
      passport_no: "123",
      passport_expiry: "22/10/2025",
      nationality: "nation",
      gender: "FEMALE",
      dob: "22/10/2025",
    },
    {
      full_name: "test2",
      passport_no: "456",
      passport_expiry: "22/10/2025",
      nationality: "nation2",
      gender: "FEMALE",
      dob: "22/10/2025",
    },
    {
      full_name: "test3",
      passport_no: "789",
      passport_expiry: "22/10/2025",
      nationality: "nation3",
      gender: "MALE",
      dob: "22/10/2025",
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllChildrenData(userId);
        userData = response.data[0];
        setDetails(userData);
      } catch (error) {
        console.log(error.response);
      }
    }

    fetchData();

    // getUserData(GET_USER_URL, phoneNumber)
    //   .then((response) => {
    //     userData = response.data[0];
    //     setDetails(userData);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  const submitData = () => {
    navigate("/success");
  };

  const onClickSelected = (index) => {
    setSelectedIndex(index);
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
        {isFamily === true ? (
          <Carousel
            nameArr={testFamilyArray}
            onClickSelected={onClickSelected}
            selectedIndex={selectedIndex}
          />
        ) : null}
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
