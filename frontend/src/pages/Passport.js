import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, BackButton } from "../components/Buttons.js";
import { useForm, FormProvider, Controller } from "react-hook-form";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextDesc from "../components/TextDesc.js";
import ProgressBar from "../components/ProgressBar";
import FormFill from "../components/FormFill";
import Calendar from "../components/Calendar";
import Carousel from "../components/Carousel";
import { blue, yellow, red } from "@mui/material/colors";
import {
  patchUserData,
  getAllChildrenData,
  patchChildData,
  getPassportData,
} from "../services/axiosRequests.js";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: yellow,
  },
});

export default function Passport() {
  const navigate = useNavigate();
  const location = useLocation();
  const [passportFile, setPassportFile] = useState();
  const [details, setDetails] = useState({
    dob: new Date(),
    passport_expiry: new Date(),
  });
  const [onEdit, setOnEdit] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [familyData, setFamilyData] = useState([]);
  const [isFamily, setIsFamily] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      full_name: "",
      nationality: "",
      passport_number: "",
      passport_expiry: new Date(),
      dob: new Date(),
      // gender: "MALE",
    },
  });
  const {
    reset,
    handleSubmit,
    register,
    getValues,
    control,
    formState: { isValid, errors },
  } = methods;
  let userId = localStorage.getItem("user_id");

  //to update the status of family members when isValid value changes (every keystroke)
  if (familyData.length > 0) {
    let copyFamilyData = familyData.slice();
    //if there is change in isValid value from before, will trigger infinite rerender if no if condition
    if (copyFamilyData[selectedIndex].status != isValid) {
      copyFamilyData[selectedIndex].status = isValid;
      setFamilyData(copyFamilyData);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllChildrenData(userId);
        let userData = checkIncompleteData(response.data); //check status of each famiy member
        setFamilyData(userData);
        setIsFamily(userData[0].is_family === "true"); //convert from string to boolean
      } catch (error) {
        console.log(error.response);
      }
    }

    //if user do not exist, reroute to landing page and prompt them to enter phone number to resume where they left off
    if (userId == null) {
      navigate("/", { state: { pop_up: true } }); //redirect to landing page and show pop up
    }

    //check if user coming from redirect page and which user it selected
    try {
      setOnEdit(location.state.on_edit);
      setSelectedIndex(location.state.index);
    } catch (error) {
      console.error(error);
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
        passport_expiry: familyData[selectedIndex].passport_expiry,
        dob: familyData[selectedIndex].dob,
        gender: familyData[selectedIndex].gender,
      });
    }
  }, [selectedIndex, familyData]);

  const checkIncompleteData = (familyData) => {
    // const compulsoryFields = [
    //   "full_name",
    //   "passport_number",
    //   "nationality",
    //   "passport_expiry",
    //   "dob",
    //   "gender",
    // ];
    for (var i = 0; i < familyData.length; i++) {
      familyData[i]["status"] = true;
      //check if any of the compulsory fields in passport details are null or empty
      if (
        Object.values(familyData[i]).slice(5, 11).includes(null) ||
        Object.values(familyData[i]).slice(5, 11).includes("")
      ) {
        // console.log(familyData[i]);
        familyData[i]["status"] = false;
      }
    }
    return familyData;
  };

  //must remember to check if all members including currently selected family member data is valid
  const onSubmit = async () => {
    //TODO: can check other family member status + current member status from isValid
    console.log("inside onSubmit");
    let data = getValues();
    // data["gender"] = details.gender;

    console.log(data);
    for (var i = 0; i < familyData.length; i++) {
      console.log(familyData[i].status);
      if (familyData[i].status === false) {
        alert("Please fill in all the compulsory fields");
        return;
      }
    }

    if (selectedIndex === 0) {
      data["url"] = "review"; //only parent database have url field
      try {
        await patchUserData(data, userId);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await patchChildData(data, familyData[selectedIndex].id);
      } catch (error) {
        console.log(error);
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

  //TODO: when user click to other user, need update familyMember data the status of current user
  const onUserSelected = async (index) => {
    let data = getValues();
    // data["gender"] = details.gender;
    console.log("onUserSelected");
    console.log(data);
    console.log(isValid);
    let copyFamilyData = familyData.slice();

    const updateFamilyData = (memberData, data) => {
      for (const key in memberData) {
        if (data[key] != undefined) {
          memberData[key] = data[key];
        }
      }
      memberData["status"] = isValid; //check if need not
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
    setDetails((prevState) => ({
      ...prevState,
      gender: "MALE",
    }));
  };

  const toggleGenderToFemale = () => {
    setDetails((prevState) => ({
      ...prevState,
      gender: "FEMALE",
    }));
  };

  const deletePassportFile = () => {
    setPassportFile();
  };

  const onPassportUpload = async (data) => {
    setIsLoading(true);
    console.log("DATA BELOW");
    console.log(data.target);
    const OBJECT_LOCATION = data.target.files[0];
    const OBJECT_CONTENT_TYPE = "image/jpeg";
    const BUCKET_NAME = "dbs-backend-1-ruby";
    const OBJECT_NAME = `passport_image_${userId}_` + new Date().getTime();
    const UPLOAD_URL = `https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_NAME}/o?uploadType=media&name=${OBJECT_NAME}`;
    const UPLOAD_HEADERS = {
      "Content-Type": OBJECT_CONTENT_TYPE,
    };
    // console.log(OBJECT_LOCATION);
    // upload to bucket
    try {
      const response = await fetch(UPLOAD_URL, {
        method: "POST",
        headers: UPLOAD_HEADERS,
        body: OBJECT_LOCATION,
      });
      console.log("RESPONSE BELOW");
      console.log(response);
      setIsLoading(false);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPassportFile(reader.result);
      });
      reader.readAsDataURL(OBJECT_LOCATION);
    } catch (error) {
      console.log(error);
    }

    // send image name to backend API
    const passportResponse = await getPassportData(OBJECT_NAME + ".jpg");
    console.log(passportResponse);
  };

  return (
    <div>
      <div className="fixed top-0 right-0 left-0 h-16 bg-white w-screen z-10" />
      <div className="fixed flex flex-row top-0 left-0 right-0 z-50">
        <BackButton onClick={onBackBtnSelected} />
        <ProgressBar percent="66%" />
      </div>

      <TextDesc
        headerText="Fill up your passport details"
        bodyText="This is important for us to verify your information"
      />

      <div className="absolute left-0 right-0 top-36 items-center ">
        <FormProvider {...methods}>
          <form className="mx-8" onSubmit={handleSubmit(onSubmit)}>
            {isFamily === true ? (
              <Carousel
                nameArr={familyData}
                onClickSelected={onUserSelected}
                selectedIndex={selectedIndex}
              />
            ) : null}
            <div>
              <label className="block font-medium">Upload Passport</label>
              <input
                // id="file-upload-button"
                className="btn_upload mt-1 w-full p-2 border border-gray-300 rounded-lg"
                type="file"
                placeholder="Passport"
                {...register("Passport", {})}
                onInput={onPassportUpload}
              />
              <div>
                <button
                  className={`btn_delete ${
                    passportFile == undefined ? "hidden" : null
                  }`}
                  onClick={deletePassportFile}
                >
                  delete
                </button>
                <div
                  role="status"
                  className={`status_loading ${!isLoading ? "hidden" : null}`}
                >
                  <svg
                    aria-hidden="true"
                    class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
                <img className="img_passport" src={passportFile} />
              </div>
            </div>
            <FormFill
              name="full_name"
              text="Full Name"
              type="text"
              onFill={register("full_name", {
                required: "Full Name is Required",
                pattern: {
                  value: /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/,
                  message: "invalid full name",
                },
              })}
            />
            {errors.full_name && (
              <p className="text-red-500">{errors.full_name?.message}</p>
            )}
            <FormFill
              name="passport_number"
              text="Passport Number"
              type="text"
              onFill={register("passport_number", {
                required: "Passport Number is Required",
                pattern: {
                  value: /^(?!^0+$)[a-zA-Z0-9]{3,20}$/,
                  message: "Invalid Passport Number",
                },
              })}
            />
            {errors.passport_number && (
              <p className="text-red-500">{errors.passport_number?.message}</p>
            )}
            <div className="mb-3">
              <label className="block font-medium">
                Passport Expiry (MM/YY)
              </label>
              <Calendar
                calendarType="passport_expiry"
                defaultDate={details.passport_expiry}
                setDetailsHandler={setDetails}
              />
            </div>
            <FormFill
              text="Nationality"
              name="nationality"
              type="text"
              onFill={register("nationality", {
                required: "Nationality is Required",
                pattern: {
                  value: /^[^-\s][a-zA-Z_\s-]+$/,
                  message: "Nationality should only contain text!",
                },
              })}
            />
            {errors.nationality && (
              <p className="text-red-500">{errors.nationality?.message}</p>
            )}
            <div className="mb-3">
              <label className="bflock font-medium">Gender</label>
              <ThemeProvider theme={theme}>
                <div className="flex justify-around">
                  <Controller
                    render={({ field }) => (
                      <ToggleButtonGroup
                        exclusive
                        aria-label="text alignment"
                        // onChange={field.onChange}
                        onChange={(newGender) => {
                          field.onChange(newGender);
                        }}
                      >
                        <ToggleButton value="MALE" key="MALE" color="secondary">
                          Male
                        </ToggleButton>
                        <ToggleButton value="FEMALE" key="FEMALE">
                          Female
                        </ToggleButton>
                      </ToggleButtonGroup>
                    )}
                    name="gender"
                    control={control}
                  />
                </div>
              </ThemeProvider>
              {errors.gender && (
                <p className="text-red-500">{errors.gender?.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">
                Date of Birth (DD/MM/YYYY)
              </label>
              <Calendar
                calendarType="dob"
                defaultDate={details.dob}
                setDetailsHandler={setDetails}
              />
            </div>
            <Button
              name="next"
              text={onEdit === true ? "Save" : "Next"}
              bgColor="bg-red-500"
              hoverColor="hover:bg-red-700"
              onClick={onSubmit}
              familyData={familyData}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
