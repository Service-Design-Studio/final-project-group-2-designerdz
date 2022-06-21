import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, BackButton } from "../components/Buttons.js";
import TextDesc from "../components/TextDesc.js";
import ProgressBar from "../components/ProgressBar";
import FormFill from "../components/FormFill";
import Calendar from "../components/Calendar";
import { postUserData } from "../services/axiosUsers";

export default function Passport() {
  const navigate = useNavigate();
  let isValid = false; //turns to true when information are filled and valid
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let posted = true;
    postUserData(data, API_URL)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
    return () => (posted = false);
  };
  console.log(errors);

  const [curGender, setCurGender] = useState("MALE");

  const toggleGenderToMale = () => {
    console.log(curGender);
    if (curGender == "FEMALE") {
      setCurGender("MALE");
    }
    console.log(curGender);
  };
  const toggleGenderToFemale = () => {
    console.log(curGender);
    if (curGender == "MALE") {
      setCurGender("FEMALE");
    }
    console.log(curGender);
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
              {...register("Passport", { required: true })}
            />
          </div>

          <FormFill text="Full Name" />
          <FormFill text="Passport Number" />

          <div className="mb-3">
            <label className="block font-medium">Passport Expiry (MM/YY)</label>

            {/* TODO: Make this button correctly to work with proper dates */}

            <div>
              <Calendar startyear={2020} endyear={2050} />
            </div>
          </div>

          <FormFill text="Nationality" />

          <div className="mb-3">
            <label className="block font-medium">Gender</label>

            <div className="flex justify-around">
              <button
                className={`${
                  curGender == "MALE" ? "bg-red-200" : "bg-gray-100"
                } w-1/2 h-10 rounded-md m-1`}
                onClick={toggleGenderToMale}
              >
                MALE
              </button>
              <button
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

            <Calendar startyear={1900} endyear={2022} />

            <Calendar startyear={1900} endyear={2022} />
          </div>
        </form>
        <div className="flex flex-col w-screen bottom-0 mb-10 space-y-4 items-center">
          <Button
            text="Next"
            bgcolor="bg-red-500"
            hovercolor="hover:bg-red-700"
            onClick={() => {
              navigate("/review");
              onSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
}
