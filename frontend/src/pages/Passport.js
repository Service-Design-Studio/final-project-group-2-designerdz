import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button, BackButton } from "../components/Buttons.js";
import TextDesc from "../components/TextDesc.js";
import ProgressBar from "../components/ProgressBar";
import FormFill from "../components/FormFill";
import Calendar from "../components/Calendar";
import Carousel from "../components/Carousel";
import {
  patchUserData,
  getAllChildrenData,
  patchChildData,
} from "../services/axiosRequests.js";

export default function Passport() {
  const navigate = useNavigate();
  const location = useLocation();
  const [details, setDetails] = useState({dob: new Date(), passport_expiry: new Date()});
  const [onEdit, setOnEdit] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [familyData, setFamilyData] = useState([]); 
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  let userId = localStorage.getItem("user_id");
  let isFamily = localStorage.getItem("is_family") === "true";

  //on first render do GET request
  useEffect(() => {
    try {
      setOnEdit(location.state.onEdit);
    } catch (error) {
      console.error(error);
    }

    async function fetchData() {
      try {
        const response = await getAllChildrenData(userId);
        setFamilyData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    }

    if (familyData.length === 0) {
      fetchData();
    }

    if (familyData[selectedIndex] !== undefined) {
      setDetails({
        full_name: familyData[selectedIndex].full_name,
        passport_number: familyData[selectedIndex].passport_number,
        nationality: familyData[selectedIndex].nationality,
        gender: familyData[selectedIndex].gender,
        passport_expiry: familyData[selectedIndex].passport_expiry,
        dob: familyData[selectedIndex].dob,
        gender: familyData[selectedIndex].gender,
      });

      reset({
        full_name: familyData[selectedIndex].full_name,
        passport_number: familyData[selectedIndex].passport_number,
        nationality: familyData[selectedIndex].nationality,
      });
    }
  }, [selectedIndex, familyData]);


  //to post the data
  const onSubmit = async (data) => {
    data = getValues();
    data["passport_expiry"] = details.passport_expiry;
    data["dob"] = details.dob;
    data["gender"] = details.gender;
    if (selectedIndex === 0) {
      try {
        await patchUserData(data, userId);
      } catch (error) {
        alert(error);
        console.log(error.response);
      }
    } else {
      try {
        await patchChildData(data, familyData[selectedIndex].id);
      } catch (error) {
        console.log(error.response);
      }
    }

    if (onEdit === true) {
      navigate("/review");
      setOnEdit(false);
    } else {
      navigate("/review"); //TODO replace with next page route for sprint 3, when expanding to more pages
    }
  };

  const onBackBtnSelected = () => {
    if (isFamily) {
      navigate("/family");
    } else {
      navigate("/details");
    }
  };

  const onClickSelected = async (index) => {
    let data = getValues();
    data["passport_expiry"] = details.passport_expiry;
    data["dob"] = details.dob;
    data["gender"] = details.gender;
    console.log(data)
    let copyFamilyData = familyData.slice();

    const updateFamilyData = (memberData, data) => {
      for (const key in memberData) {
        if (data[key] != undefined) {
          memberData[key] = data[key];
        }
      }
      return memberData;
    };

    //indicating parent
    if (selectedIndex === 0) {
      try {
        await patchUserData(data, userId);
        copyFamilyData[selectedIndex] = updateFamilyData(
          copyFamilyData[selectedIndex],
          data
        );
      } catch (error) {
        console.log(error);
      }
    }
    //indicating child
    else {
      try {
        await patchChildData(data, familyData[selectedIndex].id);
        copyFamilyData[selectedIndex] = updateFamilyData(
          copyFamilyData[selectedIndex],
          data
        );
      } catch (error) {
        console.log(error);
      }
    }
    setFamilyData(copyFamilyData);
    setSelectedIndex(index);
  };

  const toggleGenderToMale = () => {
    setDetails(prevState => ({
      ...prevState,
      "gender": "MALE"}
  ))};

  const toggleGenderToFemale = () => {
    setDetails(prevState => ({
          ...prevState,
          "gender": "FEMALE"}
      ))};

  return (
    <div>
      <div className="fixed top-0 right-0 left-0 h-16 bg-white w-screen z-10" />
      <div className="fixed flex flex-row top-0 left-0 right-0 z-50">
        <BackButton onClick={onBackBtnSelected} />
        <ProgressBar percent="66%" />
      </div>

      <TextDesc
        headerText="Fill up your passport details"
        bodyText="important for us verify bla bla"
      />

      <div className="absolute left-0 right-0 top-36 items-center ">
        <form onSubmit={handleSubmit(onSubmit)} className="mx-8">
          {isFamily === true ? (
            <Carousel
              nameArr={familyData} //TODO: replace with familyData
              onClickSelected={onClickSelected}
              selectedIndex={selectedIndex}
            />
          ) : null}
          <div>
            <label className="block font-medium">Upload Passport</label>
            <input
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
              type="file"
              placeholder="Passport"
              {...register("Passport", {})}
            />
          </div>

          <FormFill
            name="full_name"
            text="Full Name"
            type="text"
            onFill={register("full_name", {})}
          />

          <FormFill
            name="passport_number"
            text="Passport Number"
            type="text"
            onFill={register("passport_number", {})}
          />

          <div className="mb-3">
            <label className="block font-medium">Passport Expiry (MM/YY)</label>
            <div>
              <Calendar
              calendarType = "passport_expiry"
                curDate={details.passport_expiry}
                setDetailsHandler={setDetails}
              />
            </div>
          </div>

          <FormFill
            text="Nationality"
            type="text"
            onFill={register("nationality", {})}
          />

          <div className="mb-3">
            <label className="block font-medium">Gender</label>
            <div className="flex justify-around">
              <button
                type="button"
                className={`${
                  details.gender == "MALE" ? "bg-red-200" : "bg-gray-100"
                } w-1/2 h-10 rounded-md m-1`}
                onClick={toggleGenderToMale}
              >
                MALE
              </button>
              <button
                type="button"
                className={`${
                  details.gender == "FEMALE" ? "bg-red-200" : "bg-gray-100"
                } w-1/2 h-10 rounded-md m-1`}
                onClick={toggleGenderToFemale}
              >
                FEMALE
              </button>
            </div>
          </div>

          <div>
            <label className="block font-medium">
              Date of Birth (DD/MM/YYYY)
            </label>
            <Calendar
              calendarType = "dob"
                curDate={details.dob}
                setDetailsHandler={setDetails}
              />
          </div>
          <Button
            name="next"
            text={onEdit === true ? "Save" : "Next"}
            bgColor="bg-red-500"
            hoverColor="hover:bg-red-700"
            onClick={onSubmit}
          />
        </form>
      </div>
    </div>
  );
}
