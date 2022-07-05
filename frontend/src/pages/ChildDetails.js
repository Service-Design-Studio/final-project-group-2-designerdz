import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GET_USER_URL, POST_USER_URL } from "../utilities/constants.js";
import ProgressBar from "../components/ProgressBar";
import TextDesc from "../components/TextDesc.js";
import FormFill from "../components/FormFill";
import {postUserData, getUserData} from "../services/axiosUsers.js";
import {Button,BackButton} from "../components/Buttons.js";

export default function ChildDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const [details, setDetails] = useState({});
    const [onEdit, setOnEdit] = useState(false);
    const [autofill, setAutoFill] = useState(true);
    const {reset, setValue, register,handleSubmit,formState: { errors },} = useForm();

    let userData;
    let phoneNumber = localStorage.getItem("phoneNumber");

    useEffect(() => {
        try {
            setOnEdit(location.state.onEdit);
        } catch (error) {
            console.error(error);
        }

        getUserData(GET_USER_URL, phoneNumber)
        .then((response) => {
            userData = response.data[0];
            setDetails(userData);
            reset({
                display_name: userData.display_name,
                title: userData.title,
                phone_number: userData.phone_number,
                email: userData.email,
                autofill: true
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const onSubmit = (data) => {
        // TODO: Manipulate data object to only be for child, then point to child api?
        postUserData(POST_USER_URL, data, phoneNumber)
      .then((response) => {
        if (onEdit === true) {
            navigate("/review");
            setOnEdit(false);
        } else {
            navigate("/family");
        }
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
    };

    const autofillFamily = () => {
        if (autofill === false) {
            setAutoFill(true);
            setValue("autofill", true)
            setValue("phone_number", phoneNumber)
            setValue("email", details.email)
        } else {
            setAutoFill(false);
            setValue("autofill", false)
            setValue("phone_number",)
            setValue("email", )
        }
    }

    return (
        <div>
            <div className="flex flex-end">
                <BackButton onClick={() => navigate("/family")} />
                <ProgressBar percent="33%" />
            </div>
            <TextDesc
                headerText="Tell me about your child"
                bodyText=""
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

        <div className = "flex">
            <input className = "text-xl w-6 h-8 mx-4" type="checkbox" {...register("autofill", {})} onChange={autofillFamily} />
            <label className="block text-2xl font-thin"> Select if same as parent</label>   
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
            text={onEdit === true ? "Save" : "Save Child Details"}
            bgColor="bg-red-500"
            hoverColor="hover:bg-red-700"
          />
        </form>
      </div>
        </div>

    )
}