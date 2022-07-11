import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar.js";
import { Button, BackButton, EditButton } from "../components/Buttons.js";
import TextDesc from "../components/TextDesc.js";
import {
  getAllChildrenData,
  getUserDataId,
} from "../services/axiosRequests.js";
import Carousel from "../components/Carousel";

export default function Review() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [familyData, setFamilyData] = useState([]);
  let userData;
  let userId = localStorage.getItem("user_id");
  let isFamily = localStorage.getItem("is_family") === "true";

  useEffect(() => {
    async function fetchData() {
      if (isFamily) {
        if (familyData.length === 0) {
          try {
            const response = await getAllChildrenData(userId);
            userData = response.data;
            setFamilyData(userData);
            setDetails(userData[selectedIndex]); //details for current selected user
          } catch (error) {
            console.log(error.response);
          }
        }
      } else {
        try {
          const response = await getUserDataId(userId);
          console.log(response)
          userData = response.data[0];
          setDetails(userData);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
    
  }, []);

  const submitData = () => {
    navigate("/success");
  };

  const onClickSelected = (index) => {
    setSelectedIndex(index);
    setDetails(familyData[index]);
  };

  const onEditDetails = () => {
    if (selectedIndex > 0) {
      navigate("/child", {
        state: { onEdit: true, child_id: familyData[selectedIndex].id, phone_number: familyData[0].phone_number, email: familyData[0].email  },
      });
    } else {
      navigate("/details", { state: { onEdit: true } });
    }
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
            nameArr={familyData}
            onClickSelected={onClickSelected}
            selectedIndex={selectedIndex}
          />
        ) : null}
        <div className="grid grid-cols-2 mt-6">
          <b className="text-xl">Basic Information</b>
          <b className="text-xl text-right">
            <EditButton onClick={onEditDetails} />
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
            {details === undefined ? "" : details.passport_number}
          </p>
          <p>Passport Expiry:</p>
          <p className="text-right">
            {details === undefined ? "" : new Date(details.passport_expiry).toLocaleDateString('en-us', {year:"numeric", month:"short"})}
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
            {details === undefined ? "" : new Date(details.dob).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}
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
