import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Button,
  BackButton,
  DeleteImageButton,
} from "../components/Buttons.js";
import { useForm, FormProvider, Controller } from "react-hook-form";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextDesc from "../components/TextDesc.js";
import ProgressBar from "../components/ProgressBar";
import FormFill from "../components/FormFill";
import Calendar from "../components/Calendar";
import Carousel from "../components/Carousel";
import LoadingStatus from "../components/LoadingStatus";
import bucketUpload from "../services/bucketUpload";
import {
  patchUserData,
  getAllChildrenData,
  patchChildData,
  getPassportData,
} from "../services/axiosRequests.js";

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
      passport_expiry: null,
      dob: null,
      // gender: "MALE",
    },
  });
  const {
    reset,
    setError,
    clearErrors,
    handleSubmit,
    register,
    getValues,
    control,
    trigger,
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

  //TODO: see if you can get away with details,setDetails useState for sprint 4 is can one JYYYY
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllChildrenData(userId);
        let userData = checkIncompleteData(response.data); //check status of each famiy member
        setFamilyData(userData);

        setIsFamily(userData[0].is_family === "true"); //convert from string to boolean
        console.log("WHOLE USER DATA");
        console.log(userData[0]);
        console.log(userData[0].image_name);
        if (userData[0].image_name != undefined) {
          setPassportFile(userData[0].image_name);
        }
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
        image_name: familyData[selectedIndex].image_name,
      });
      if (familyData[selectedIndex].image_name != undefined) {
        setPassportFile(
          "https://storage.googleapis.com/dbs-backend-1-ruby/".concat(
            familyData[selectedIndex].image_name
          )
        );
      }
    }
  }, [selectedIndex, familyData]);

  const checkIncompleteData = (familyData) => {
    for (var i = 0; i < familyData.length; i++) {
      familyData[i]["status"] = true;
      //check if any of the compulsory fields in passport details are null or empty
      if (
        Object.values(familyData[i]).slice(5, 11).includes(null) ||
        Object.values(familyData[i]).slice(5, 11).includes("")
      ) {
        familyData[i]["status"] = false;
      }
    }
    return familyData;
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
    data["image_name"] = details.image_name;
    // "https://storage.googleapis.com/dbs-backend-1-ruby/".concat(
    //   details.image_name
    // );
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
    setPassportFile();
    // reset({
    //   passport_expiry: null,
    //   dob: null,
    // });
  };

  const onPassportUpload = async (data) => {
    clearErrors("valid_file_type");
    clearErrors("valid_passport_image");
    setPassportFile();

    if (
      !["image/jpeg", "image/png", "image/jpg"].includes(
        data.target.files[0].type
      )
    ) {
      console.log("Invalid File Type");
      setError("valid_file_type", {
        type: "Custom",
        message: "Only PNG or JPEG is accepted",
      });
      return;
    }

    setIsLoading(true);
    const OBJECT_NAME = `passport_image_${userId}_` + new Date().getTime();
    const OBJECT_LOCATION = data.target.files[0];

    await bucketUpload(data, userId);

    //get autofill details and setDetails according to data
    try {
      // send image name to backend API
      const passportResponse = await getPassportData(OBJECT_NAME);
      const ocrData = passportResponse.data;
      console.log("RESPONSE FROM VISION API BACKEND");
      console.log(ocrData);

      // display image on frontend
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPassportFile(reader.result);
      });
      reader.readAsDataURL(OBJECT_LOCATION);

      // iterate through passportResponse and update setDetails
      //TODO: sprint 4 investigate possibility of removing this, seems redundant actually
      setDetails((prevState) => ({
        ...prevState,
        full_name: ocrData.full_name,
        passport_number: ocrData.passport_number,
        nationality: ocrData.nationality,
        passport_expiry: new Date(ocrData.passport_expiry), //TODO: process to correct format date
        dob: new Date(ocrData.dob), //TODO: process to correct format date
        gender: ocrData.gender == "M" ? "MALE" : "FEMALE",
        image_name: OBJECT_NAME,
        // F,
      }));
      reset({
        full_name: ocrData.full_name,
        passport_number: ocrData.passport_number,
        nationality: ocrData.nationality,
        passport_expiry: new Date(ocrData.passport_expiry),
        dob: new Date(ocrData.dob),
        gender: ocrData.gender == "M" ? "MALE" : "FEMALE",
      });
    } catch (error) {
      console.log("catch vision api error");
      console.log(error.response);

      setError("valid_passport_image", {
        type: "Custom",
        message: error.response.data.error,
      });
    }
    setIsLoading(false);
  };

  const deletePassportFile = () => {
    setPassportFile(); //to remove image preview
    //reset image name field under upload passport
    console.log(getValues());
    const formData = getValues();
    //TODO: figure out less hacky way of resetting, cos upon delete, form validation fails
    reset({
      Passport: "",
      passport_expiry: formData.passport_expiry,
      dob: formData.dob,
      gender: formData.gender,
    });
    details.image_name = null;
    familyData[selectedIndex].image_name = null;
    trigger();
  };

  //must remember to check if all members including currently selected family member data is valid
  const onSubmit = async () => {
    //TODO: can check other family member status + current member status from isValid
    console.log("inside onSubmit");
    let data = getValues();
    console.log(data);

    for (var i = 0; i < familyData.length; i++) {
      console.log(familyData[i].status);
      if (familyData[i].status === false) {
        // alert("Please fill in all the compulsory fields")
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
      navigate("/review", { state: { index: selectedIndex } });
      setOnEdit(false);
    } else {
      navigate("/review"); //TODO replace with next page route for sprint 3, when expanding to more pages
    }
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
            {isFamily === true && !onEdit ? (
              <Carousel
                nameArr={familyData}
                onClickSelected={onUserSelected}
                selectedIndex={selectedIndex}
              />
            ) : null}
            <div>
              <label className="block font-medium">Upload Passport</label>
              <input
                className="btn_upload mt-1 w-full p-2 border border-gray-300 rounded-lg"
                type="file"
                placeholder="Passport"
                {...register("Passport")}
                onInput={onPassportUpload}
              />
              {errors.valid_file_type && (
                <p className="text-red-500">
                  {errors.valid_file_type?.message}
                </p>
              )}
              {errors.valid_passport_image && (
                <p className="text-red-500">
                  {errors.valid_passport_image?.message}
                </p>
              )}
              <div className="flex items-center flex-col">
                <LoadingStatus isLoading={isLoading} />
                <img
                  className={`${
                    passportFile == undefined ? "hidden" : null
                  } img_passport`}
                  src={passportFile}
                />
                <DeleteImageButton
                  passportFile={passportFile}
                  onClick={deletePassportFile}
                />
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
                Passport Expiry (DD/MM/YYYY)
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
              <div className="flex justify-around">
                <Controller
                  rules={{ required: "Gender is Required" }}
                  render={({ field }) => (
                    <ToggleButtonGroup
                      exclusive
                      aria-label="text alignment"
                      onChange={(newGender) => {
                        field.onChange(newGender);
                      }}
                      value={field.value}
                      color="error"
                    >
                      <ToggleButton
                        className="male w-24"
                        aria-label="left aligned"
                        value="MALE"
                        key="MALE"
                      >
                        Male
                      </ToggleButton>
                      <ToggleButton
                        className="female w-24"
                        value="FEMALE"
                        key="FEMALE"
                      >
                        Female
                      </ToggleButton>
                    </ToggleButtonGroup>
                  )}
                  name="gender"
                  control={control}
                />
              </div>
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
