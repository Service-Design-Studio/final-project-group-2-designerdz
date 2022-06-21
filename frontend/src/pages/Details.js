import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { API_URL} from "../utilities/constants.js";
import ProgressBar from "../components/ProgressBar";
import { Button, BackButton } from "../components/Buttons.js";
import TextDesc from "../components/TextDesc.js";
import FormFill from "../components/FormFill";
import { postUserData, getUserData } from "../services/axiosUsers.js";
import { useEffect, useState } from "react";


export default function Details() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  var response;
  var test_data;
  let phone_number =localStorage.getItem("phone_number")
  //on first render do GET request
  useEffect(() => {
    console.log("THE PHONE NUMBER IS...")
    console.log(phone_number)
    getUserData(API_URL, phone_number).then(
      (response) => {
        // iterate through response.data and find where the phone_number == phone_number
        console.log("RESPONSE DATA LENGTH")
        console.log(response.data.length)
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].phone_number == phone_number) {
            console.log("SUCCESSFULLY SET TEST_DATA")
            test_data = response.data[i];
            console.log(test_data)
          }
        }
        console.log("test_data");
        console.log(test_data)
        setDetails({'display_name': test_data.display_name, 'title': test_data.title, 'phone_number': test_data.phone_number, 'email': test_data.email} )
        reset({'display_name': test_data.display_name, 'title': test_data.title, 'phone_number': test_data.phone_number, 'email': test_data.email})
      }).catch((error)=>{console.log(error);})
      

  }, []);
  console.log(details)
  console.log("title")
  console.log(details.title)
  console.log(typeof details.title)


  //post request to database backend
  const onSubmit = (data) => {
    console.log("inside onSubmit")
    console.log(data);
    let posted = true
    postUserData(API_URL, data)
      .then((response) => {
        console.log("post response below")
        console.log(response)
      })
      .catch((error) => {
        console.log(error.response);
        posted = false
      });
    if (posted == true) {
      console.log("Inside posted true")
      localStorage.setItem("phone_number", data.phone_number)
      navigate('/passport')
    }
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
                className="inline-flex items-center px-3 text-sm border border-r-0 border-gray-300 rounded-l-md dark:text-gray-900 dark:border-gray-600"
                {...register("title", {})}
              >
                <option value={details.title} selected hidden disabled>{details.title}</option>
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
            onFill = {register("phone_number", {})}
            />

          <FormFill
            type="email"
            text="Email Address (Optional)"
            onFill = {register("email", {})} 
            />

          <button
            className={`mt-10 bg-red-500 hover:bg-red-700 text-white text-xl font-extrabold py-4 px-4 rounded w-10/12`}
            type="submit">
            Next
          </button>

        </form>
      </div>
    </div>
  );
}
