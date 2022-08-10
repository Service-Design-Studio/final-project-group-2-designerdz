import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProgressBar from "../components/ProgressBar";
import { Button, BackButton } from "../components/Buttons.js";
import TextDesc from "../components/TextDesc.js";
import FormFill from "../components/FormFill";
import {
  postUserData,
  patchUserData,
  getUserDataId,
} from "../services/axiosRequests.js";

export default function Details() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFamily, setIsFamily] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let userData;
  let userId = localStorage.getItem("user_id") || "";

  //on first render do GET request
  useEffect(() => {
    try {
      setOnEdit(location.state.on_edit);
      setIsFamily(location.state.is_family);
    } catch (error) {
      console.error(error);
      //redirect back to landing if isfamily null
    }

    async function fetchData() {
      try {
        const response = await getUserDataId(userId);
        userData = response.data[0];
        if (location.state == undefined) {
          //location.state.is_family take precedence over is_family data from db
          //if location.state is undefined, then it means that user is redirected from landing page/review page
          //if not user cannot switch from family to single user signup and vice versa
          setIsFamily(userData.is_family === "true");
        }
        reset({
          display_name: userData.display_name,
          title: userData.title,
          phone_number: userData.phone_number,
          email: userData.email,
        });
      } catch (error) {
        if (location.state == undefined) {
          navigate("/signup");
        }
        console.log(error.response);
      }
    }
    fetchData();
  }, []);

  //post request to database backend
  const onSubmit = async (data) => {
    const navigateNextPage = () => {
      if (onEdit === true) {
        navigate("/review");
        setOnEdit(false);
      } else {
        if (isFamily === true) {
          navigate("/family");
        } else {
          navigate("/passport");
        }
      }
    };

    data["is_family"] = isFamily.toString(); //convert to string for json

    //TODO: fix bug, if new user click next but user exist, navigate back to landing page,
    //then pop up enter phone number, will redirect to passport, but phone number is empty field??? NEED TO CHECK
    //ASSUMPTION: user not likely to type in the wrong phone number
    if (isFamily) {
      data["url"] = "family"; //will be redirected to /family on resumption
    } else {
      data["url"] = "passport"; //will be redirected to /passport on resumption
    }
    if (userId == "") {
      try {
        //update path
        const response = await postUserData(data);
        localStorage.setItem("user_id", response.data.id);
        navigateNextPage();
      } catch (error) {
        if (error.response.status === 422) {
          //TODO; redirect to latest step
          navigate("/", { state: { pop_up: true } });
        }
        console.log(error.response);
      }
    } else {
      try {
        await patchUserData(data, userId);
        navigateNextPage();
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-end">
        <BackButton onClick={() => navigate("/signup")} />
        <ProgressBar percent="33%" />
      </div>

      <TextDesc
        headerText="Tell me about yourself"
        bodyText="We want to know you better!"
      />
      <div className="grid h-screen place-content-center mx-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block font-medium">Given Name</label>

            <div className="flex">
              <select
                className="title inline-flex items-center px-3 text-sm border border-r-0 border-gray-300 rounded-l-md dark:text-gray-900 dark:border-gray-600"
                name="title"
                {...register("title", {})}
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Mdm">Mdm</option>
                <option value="Dr">Dr</option>
              </select>

              <input
                type="text"
                className="display_name rounded-none rounded-r-lg border focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Last / Display Name"
                name="display_name"
                {...register("display_name", {
                  required: "Display Name is Required",
                })}
              />
            </div>
            {errors.display_name && (
              <p className="text-red-500">{errors.display_name.message}</p>
            )}

            <h3 className="opacity-50 text-xs mb-4">
              This is how you will be acknowledged on PayLah! and digibank.
              <a
                className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
                href="https://google.com"
              >
                {" "}
                Find out more
              </a>
            </h3>
          </div>

          <FormFill
            text="Phone Number"
            type="text"
            name="phone_number"
            onFill={register("phone_number", {
              required: "Phone Number is Required",
              pattern: {
                value: /^[0-9]*$/,
                message: "Please enter using numbers only",
              },
            })}
          />
          {errors.phone_number && (
            <p className="text-red-500">{errors.phone_number.message}</p>
          )}
          <FormFill
            type="email"
            name="email"
            text="Email Address (Optional)"
            onFill={register("email", {})}
          />
          <Button
            name="next"
            text={onEdit === true ? "Save" : "Next"}
            bgColor="bg-red-500"
            hoverColor="hover:bg-red-700"
          />
        </form>
      </div>
    </div>
  );
}
