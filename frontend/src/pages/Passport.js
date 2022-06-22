import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button, BackButton } from "../components/Buttons.js";
import TextDesc from "../components/TextDesc.js";
import ProgressBar from "../components/ProgressBar";
import FormFill from "../components/FormFill";
import Calendar from "../components/Calendar";
import {
  getUserData,
  postUserData,
  patchUserData,
} from "../services/axiosUsers";
import { API_URL, PATCH_API_URL } from "../utilities/constants";

export default function Passport() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const [passportDate, setPassportDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState(new Date());
  const [curGender, setCurGender] = useState("MALE");
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //on first render do GET request
  let phone_number;
  let test_data;
  phone_number = localStorage.getItem("phone_number");
  console.log("PHONE NUMBER IN PASSPORT.JS");
  console.log("phone_number: " + phone_number);

  useEffect(() => {
    getUserData(API_URL, phone_number)
      .then((response) => {
        // iterate through response.data and find where the phone_number == phone_number
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].phone_number == phone_number) {
            test_data = response.data[i];
          }
        }

        setDetails({
          full_name: test_data.full_name,
          passport_no: test_data.passport_no,
          nationality: test_data.nationality,
        });

        if (details["passport_expiry"] !== undefined) {
          setPassportDate(new Date());
        } else {
          setPassportDate(new Date(test_data.passport_expiry));
        }
        if (details["dob"] !== undefined) {
          setBirthDate(new Date());
        } else {
          setBirthDate(new Date(test_data.dob));
        }
        if (details["gender"] == undefined) {
          setCurGender("MALE");
        } else {
          setCurGender(test_data.gender);
        }

        reset({
          full_name: test_data.full_name,
          passport_no: test_data.passport_no,
          title: test_data.title,
          nationality: test_data.nationality,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (data) => {
    data["passport_expiry"] = passportDate;
    data["dob"] = birthDate;
    data["gender"] = curGender;
    let posted = true;
    console.log(data["passport_expiry"]);
    console.log("THE PHONE NUMBER IS...");
    console.log(phone_number);

    patchUserData(PATCH_API_URL, data, phone_number)
      .then((response) => {
        console.log("response is");
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
        posted = false;
      });
    if (posted == true) {
      navigate("/review");
    }

    console.log(errors);
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
            // defaultValue = {details.full_name}
          />

          <FormFill
            id="passport_no"
            text="Passport Number"
            type="text"
            onFill={register("passport_no", {})}
            // defaultValue = {details.passport_no}
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
            // defaultValue = {details.nationality}
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

          <div className="mb-3">
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

          <button
            className={`next absolute mt-10 bg-red-500 hover:bg-red-700 text-white text-xl font-extrabold py-4 px-4 rounded w-10/12`}
            type="submit"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
