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
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: yellow,
  },
});

export default function Passport() {
  const navigate = useNavigate();
  const location = useLocation();
  const [details, setDetails] = useState({
    dob: new Date(),
    passport_expiry: new Date(),
  });
  const [onEdit, setOnEdit] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [familyData, setFamilyData] = useState([]);
  const [isFamily, setIsFamily] = useState(false);
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

  const onPassportUpload = async (data) => {
    const OBJECT_LOCATION = data.target.files[0];
    const OBJECT_CONTENT_TYPE = "image/jpg";
    const BUCKET_NAME = "react-frontend-353408.appspot.com";
    const OBJECT_NAME = `${userId}_passport_image`;
    const UPLOAD_URL = `https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_NAME}/o?uploadType=media&name=${OBJECT_NAME}`;
    const UPLOAD_HEADERS = {
      "Content-Type": OBJECT_CONTENT_TYPE,
    };

    // upload to bucket
    const response = await fetch(UPLOAD_URL, {
      method: "POST",
      headers: UPLOAD_HEADERS,
      body: OBJECT_LOCATION,
    });

    // send image name to backend API
    const passportResponse = await getPassportData(OBJECT_NAME);
    console.log(response);
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
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                type="file"
                placeholder="Passport"
                {...register("Passport", {})}
                onChange={onPassportUpload}
              />
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
