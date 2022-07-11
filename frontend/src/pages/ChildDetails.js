import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProgressBar from "../components/ProgressBar";
import TextDesc from "../components/TextDesc.js";
import FormFill from "../components/FormFill";
import {
  getChildData,
  postChildData,
  patchChildData,
} from "../services/axiosRequests.js";
import { Button, BackButton } from "../components/Buttons.js";

export default function ChildDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [validForm, setValidForm] = useState(false);
  const [details, setDetails] = useState({});
  const [onEdit, setOnEdit] = useState(false);
  const [autofill, setAutoFill] = useState(true);

  const {
    reset,
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let childData;
  let parentId = location.state.parent_id;
  let childId = location.state.child_id;
  let phoneNumber = location.state.phone_number;
  let email = location.state.email;


  useEffect(() => {
    try {
      setOnEdit(location.state.onEdit);
    } catch (error) {
      console.error(error);
    }

    async function fetchData(childId) {
      try {
        const response = await getChildData(childId);
        childData = response.data;
        console.log(childData);
        if (childData.phone_number == undefined) {
          childData.phone_number = phoneNumber;
          childData.email = email;
        }
        if (childData.phone_number == phoneNumber && childData.email == email){
          setAutoFill(true);
        } else {
          setAutoFill(false);
        }

        setDetails(childData);
        reset({
          display_name: childData.display_name,
          title: childData.title,
          phone_number: childData.phone_number,
          email: childData.email,
          autofill: childData.phone_number == phoneNumber && childData.email == email ? true : false
        });
      } catch (error) {
        console.error(error.response);
      }
    }

    // If child_id is not undefined then we are editing an existing child
    if (childId) {
      console.log("Fetching Data for existing child id");
      console.log(childId);
      fetchData(childId);
    } else {
      // If child_id is undefined then we are creating a new child  
      setAutoFill(true)
      reset({
        phone_number: phoneNumber,
        email: email,
        autofill: true})
      }
  }, []);

  const onSubmit = (data) => {
    // TODO: Check if validForm is true, if not, don't post to backend and do not navigate away
    if (childId) {
      try {
        patchChildData(data, childId);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        postChildData(data, parentId);
      } catch (error) {
        console.log(error.response);
      }
    }

    if (onEdit === true) {
      navigate("/review");
      setOnEdit(false);
    } else {
      navigate("/family");
    }
  };

  const autofillFamily = () => {
    if (autofill === false) {
      setAutoFill(true);
      setValue("autofill", true);
      setValue("phone_number", phoneNumber);
      setValue("email", email);
    } else {
      setAutoFill(false);
      setValue("autofill", false);
      setValue("phone_number");
      setValue("email");
    }
  };

  const validateInputs = () => {
    console.log("changing");
    console.log(getValues());
    if (
      getValues().phone_number === "" ||
      getValues().email === "" ||
      getValues().display_name === ""
    ) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  };

  return (
    <div>
      <div className="flex flex-end">
        <BackButton onClick={() => navigate("/family")} />
        <ProgressBar percent="33%" />
      </div>
      <TextDesc headerText="Tell me about your child" bodyText="" />
      <div className="grid h-screen place-content-center mx-8">
        <form onSubmit={handleSubmit(onSubmit)} onChange={validateInputs}>
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

          <div className="flex">
            <input
              className="autofill text-xl w-6 h-8 mx-4"
              type="checkbox"
              {...register("autofill", {})}
              onChange={autofillFamily}
            />
            <label className="block text-2xl font-thin">
              {" "}
              Select if same as parent
            </label>
          </div>
          {console.log("AUTOFILL STATE" + autofill)}
          <FormFill
            text="Phone Number"
            type="number"
            name="child_number"
            onFill={register("phone_number", {})}
            autofill = {autofill}
          />

          <FormFill
            type="email"
            text="Email Address (Optional)"
            name="child_email"
            onFill={register("email", {})}
            autofill = {autofill}
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
  );
}
