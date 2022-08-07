import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [details, setDetails] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [familyData, setFamilyData] = useState([]);
  const [isFamily, setIsFamily] = useState(false);
  let userData;
  let userId = localStorage.getItem("user_id");

  useEffect(() => {
    function checkIncompleteData(familyData) {
      let compulsory_fields = ["full_name", "passport_number", "nationality"];
      for (var i = 0; i < familyData.length; i++) {
        familyData[i]["status"] = true;
        for (let field of compulsory_fields) {
          if (
            familyData[i][field] == undefined ||
            familyData[i][field] == null ||
            familyData[i][field] == "" ||
            familyData[i][field] == " "
          ) {
            familyData[i]["status"] = false;
          }
        }
      }
      return familyData;
    }

    async function fetchData() {
      let updatedFamilyData;
      if (familyData.length === 0) {
        console.log("If statement");
        try {
          const response = await getAllChildrenData(userId);
          updatedFamilyData = checkIncompleteData(response.data);
          userData = updatedFamilyData[0];
          setDetails(userData);
          setFamilyData(updatedFamilyData);
        } catch (error) {
          console.log(error);
        }
      } else if (familyData.length > 1) {
        //this means family registration
        setIsFamily(true);
      }

      if (location.state != undefined) {
        setSelectedIndex(location.state.index);
        setDetails(updatedFamilyData[location.state.index]);
      }
    }

    //if user do not exist, reroute to landing page and prompt them to enter phone number to resume where they left off
    if (userId == null) {
      navigate("/", { state: { pop_up: true } }); //redirect to landing page and show pop up
    }

    fetchData();
  }, [familyData]);

  const submitData = () => {
    navigate("/success");
  };

  const onUserSelected = (index) => {
    setSelectedIndex(index);
    setDetails(familyData[index]);
  };

  const onEditDetails = () => {
    if (selectedIndex > 0) {
      navigate("/child", {
        state: {
          onEdit: true,
          child_id: familyData[selectedIndex].id,
          phone_number: familyData[0].phone_number,
          email: familyData[0].email,
        },
      });
    } else {
      navigate("/details", { state: { on_edit: true } });
    }
  };

  const onEditPassport = () => {
    navigate("/passport", { state: { on_edit: true, index: selectedIndex } });
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
            onClickSelected={onUserSelected}
            selectedIndex={selectedIndex}
          />
        ) : null}
        <div className="grid grid-cols-2 mt-6">
          <b className="text-xl">Basic Information</b>
          <b className="text-xl text-right">
            <EditButton name="basic_edit" onClick={onEditDetails} />
          </b>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <p>Display Name:</p>
          <p className="display_name text-right">
            {details === undefined ? "" : details.display_name}
          </p>
          <p>Phone Number:</p>
          <p id="phone_no" className="phone_number text-right">
            {details === undefined ? "" : details.phone_number}
          </p>
          <p>Email</p>
          <p id="email" className="email text-right">
            {details === undefined ? "" : details.email}
          </p>
        </div>

        <div className="grid grid-cols-2 mt-6">
          <b className="text-xl">Passport</b>
          <b className="text-xl text-right">
            <EditButton name="passport_edit" onClick={onEditPassport} />
          </b>
        </div>

        <div className="grid grid-cols-2 gap-4 ">
          <p>Full Name:</p>
          <p className="review_fn text-right">
            {details === undefined ? "" : details.full_name}
          </p>
          <p>Passport Number:</p>
          <p className="review_pn text-right">
            {details === undefined ? "" : details.passport_number}
          </p>
          <p>Passport Expiry:</p>
          <p className="review_pe text-right">
            {details === undefined
              ? ""
              : new Date(details.passport_expiry).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
          </p>
          <p>Nationality:</p>
          <p className="review_nationality text-right">
            {details === undefined ? "" : details.nationality}
          </p>
          <p>Gender:</p>
          <p className="review_gender text-right">
            {details === undefined ? "" : details.gender}
          </p>
          <p>Date of Birth:</p>
          <p className="review_dob text-right">
            {details === undefined
              ? ""
              : new Date(details.dob).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
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
