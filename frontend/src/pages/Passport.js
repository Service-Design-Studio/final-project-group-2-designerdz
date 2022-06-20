import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button, BackButton } from "../components/Buttons.js";
import TextDesc from "../components/TextDesc.js";
import ProgressBar from "../components/ProgressBar";
import FormFill from "../components/FormFill";
import Calendar from "../components/Calendar";

export default function Passport() {
  const navigate = useNavigate();
  let isValid = false; //turns to true when information are filled and valid
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/review");
  };
  console.log(errors);


  return (
    <div>
      <div className="fixed top-0 right-0 left-0 h-16 bg-white w-screen z-10" />
      <div className="fixed flex flex-row top-0 left-0 right-0 z-50">
        <BackButton onClick={() => navigate(-1)} />
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
          <FormFill/>

          <div className="mb-3">
            <label className="block font-medium">Passport Expiry (MM/YY)</label>

            {/* TODO: Make this button correctly to work with proper dates */}

            <div>
              <Calendar/>
            </div>
            



            
          </div>

          <FormFill text="Nationality" />

          <div className="mb-3">
            <label className="block font-medium">Gender</label>

            {/* TODO: Make this button clickable like pills upon selection */}
            <div className="flex">
              <select
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("Date of Birth", { required: true })}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>

              <select
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("Date of Birth", { required: true })}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="block font-medium">
              Date of Birth (DD/MM/YYYY)
            </label>

            {/* TODO: Make this button correctly to work with proper dates */}
          
          <Calendar></Calendar>


          </div>
        </form>
        <div className="flex flex-col w-screen bottom-0 mb-10 space-y-4 items-center">
          <Button
            text="Next"
            bgcolor="bg-red-500"
            hovercolor="hover:bg-red-700"
            onClick={() => {
              navigate("/passport");
              onSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
}
