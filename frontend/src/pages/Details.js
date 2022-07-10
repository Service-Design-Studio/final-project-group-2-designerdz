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
  const [details, setDetails] = useState({});
  const [onEdit, setOnEdit] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let userData;
  let userId = localStorage.getItem("user_id");
  let isFamily = localStorage.getItem("is_family") === "true"; //will have to get this info from db de

  //on first render do GET request
  useEffect(() => {
    try {
      setOnEdit(location.state.onEdit);
    } catch (error) {
      console.error(error);
    }

    async function fetchData() {
      try {
        const response = await getUserDataId(userId);
        userData = response.data[0];
        console.log(response);
        console.log(userData);
        setDetails(userData);
        reset({
          display_name: userData.display_name,
          title: userData.title,
          phone_number: userData.phone_number,
          email: userData.email,
        });
      } catch (error) {
        console.log(error.response);
      }
    }

    fetchData();

    // getUserData(GET_USER_URL, userId)
    //   .then((response) => {
    //     userData = response.data[0];
    //     setDetails(userData);
    //     reset({
    //       display_name: userData.display_name,
    //       title: userData.title,
    //       phone_number: userData.phone_number,
    //       email: userData.email,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  //post request to database backend
  const onSubmit = async (data) => {
    console.log("userId is :" + userId);
    console.log(userId == null);
    if (userId == null) {
      try {
        const response = await postUserData(data);
        localStorage.setItem("user_id", response.data.id);
      } catch (error) {
        console.log(error.response);
      }
    } else {
      try {
        patchUserData(data, userId);
      } catch (error) {
        console.log(error.response);
      }
    }

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

    // postUserData(POST_USER_URL, data, userId) //TODO: backend has to setup to intercept HTTP request, to check if user exist or not
    //   .then((response) => {
    //     localStorage.setItem("userId", data.phone_number); //this updates with latest phone number form form
    //     if (onEdit === true) {
    //       navigate("/review");
    //       setOnEdit(false);
    //     } else {
    //       if (isFamily === true) {
    //         navigate("/family");
    //       } else {
    //         navigate("/passport");
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     alert(error);
    //     console.log(error);
    //   });
  };

  return (
    <div>
      <div className="flex flex-end">
        <BackButton onClick={() => navigate("/signup")} />
        <ProgressBar percent="33%" />
      </div>

      <TextDesc
        headerText="Tell me about yourself first"
        bodyText="sth know you better sth know you better"
      />
      <div className="grid h-screen place-content-center mx-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block font-medium">Given Name</label>

            <div className="flex">
              <select
                className="name inline-flex items-center px-3 text-sm border border-r-0 border-gray-300 rounded-l-md dark:text-gray-900 dark:border-gray-600"
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
                className="rounded-none rounded-r-lg border focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Last / Display Name"
                {...register("display_name", {})}
              />
            </div>

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
            type="number"
            onFill={register("phone_number", {})}
          />

          <FormFill
            type="email"
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
