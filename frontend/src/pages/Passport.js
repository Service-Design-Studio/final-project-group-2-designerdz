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
  getUserData,
  postUserData,
  patchUserData,
} from "../services/axiosUsers";
import { GET_USER_URL, PATCH_USER_URL } from "../utilities/constants";

export default function Passport() {
  const navigate = useNavigate();
  const location = useLocation();
  const [details, setDetails] = useState({});
  const [passportDate, setPassportDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState(new Date());
  const [curGender, setCurGender] = useState("MALE");
  const [onEdit, setOnEdit] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0); //handle selected index of carousel
  const [familyData, setFamilyData] = useState([]); //TODO: need check if need this not, to store family data for state change of carousel
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  let phoneNumber = localStorage.getItem("phoneNumber");
  let isFamily = localStorage.getItem("isFamily") === "true";

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

  //on first render do GET request
  useEffect(() => {
    try {
      setOnEdit(location.state.onEdit);
    } catch (error) {
      console.error(error);
    }

    if (familyData.length === 0) {
      getUserData(GET_USER_URL, phoneNumber)
        .then((response) => {
          // setFamilyData(testFamilyArray); //TODO: replace testFamilyArray with response.data
        })
        .catch((error) => {
          setFamilyData(testFamilyArray); //TODO: remove this
          console.log(error);
        });
    }

    if (familyData[selectedIndex] !== undefined) {
      console.log(familyData[selectedIndex]);
      setDetails({
        full_name: familyData[selectedIndex].full_name,
        passport_no: familyData[selectedIndex].passport_no,
        nationality: familyData[selectedIndex].nationality,
      });

      //TODO: need to uncomment the dates part after database done with schema
      // details["passport_expiry"] !== undefined
      //   ? setPassportDate(new Date())
      //   : setPassportDate(
      //       new Date(familyData[selectedIndex].passport_expiry)
      //     );

      // details["dob"] !== undefined
      //   ? setBirthDate(new Date())
      //   : setBirthDate(new Date(familyData[selectedIndex].dob));
      details["gender"] === undefined
        ? setCurGender(familyData[selectedIndex].gender)
        : setCurGender("MALE");

      reset({
        full_name: familyData[selectedIndex].full_name,
        passport_no: familyData[selectedIndex].passport_no,
        nationality: familyData[selectedIndex].nationality,
      });
    }
  }, [selectedIndex, familyData]);

  //to post the data
  const onSubmit = (data) => {
    console.log("data is ", data);
    console.log("selectedIndex in onSubmit is:", selectedIndex);
    data["passport_expiry"] = passportDate;
    data["dob"] = birthDate;
    data["gender"] = curGender;

    patchUserData(PATCH_USER_URL, data, phoneNumber, selectedIndex)
      .then((response) => {
        if (onEdit === true) {
          navigate("/review");
          setOnEdit(false);
        } else {
          navigate("/review"); //TODO replace with next page route for sprint 3, when expanding to more pages
        }
      })
      .catch((error) => {
        // navigate("/review");
        console.log(error.response);
      });
    console.log(errors);
  };

  //TODO: finish up logic for carousel view
  //need to post data between different selection of carousel view
  const onClickSelected = (index) => {
    let data = getValues();
    data["passport_expiry"] = passportDate;
    data["dob"] = birthDate;
    data["gender"] = curGender;

    //TODO: do patch request header
    patchUserData(PATCH_USER_URL, data, phoneNumber, selectedIndex) //index for updating child?
      .then((response) => {
        const copyFamilyData = familyData.slice();
        copyFamilyData[selectedIndex] = data;
        setFamilyData(newDataState);
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log("data is ", data);
    //rmb to remove this when actual data and BE settled
    const newDataState = familyData.slice();
    newDataState[selectedIndex] = data;
    console.log("copy newDataState is ", newDataState);
    setFamilyData(newDataState);

    setSelectedIndex(index);
  };

  const toggleGenderToMale = () => {
    if (curGender === "FEMALE") {
      setCurGender("MALE");
    }
  };
  const toggleGenderToFemale = () => {
    if (curGender === "MALE") {
      setCurGender("FEMALE");
    }
  };

  return (
    <div>
      <div className="fixed top-0 right-0 left-0 h-16 bg-white w-screen z-10" />
      <div className="fixed flex flex-row top-0 left-0 right-0 z-50">
        <BackButton onClick={() => navigate("/details")} />
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
              nameArr={testFamilyArray}
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
            id="full_name"
            text="Full Name"
            type="text"
            onFill={register("full_name", {})}
          />

          <FormFill
            id="passport_no"
            text="Passport Number"
            type="text"
            onFill={register("passport_no", {})}
          />

          <div className="mb-3">
            <label className="block font-medium">Passport Expiry (MM/YY)</label>
            <div>
              <Calendar
                curDate={passportDate}
                setDate={setPassportDate}
                startYear={2020}
                endYear={2050}
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
                  curGender == "MALE" ? "bg-red-200" : "bg-gray-100"
                } w-1/2 h-10 rounded-md m-1`}
                onClick={toggleGenderToMale}
              >
                MALE
              </button>
              <button
                type="button"
                className={`${
                  curGender == "FEMALE" ? "bg-red-200" : "bg-gray-100"
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
              curDate={birthDate}
              setDate={setBirthDate}
              startYear={1900}
              endYear={2022}
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
