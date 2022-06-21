import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { API_URL } from "../utilities/constants.js";
import ProgressBar from "../components/ProgressBar";
import { Button, BackButton } from "../components/Buttons.js";
import TextDesc from "../components/TextDesc.js";
import FormFill from "../components/FormFill";

export default function Details() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //post request to database backend
  const onSubmit = (data) => {
    console.log(data);
    navigate("/passport")
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
                className="inline-flex items-center px-3 text-sm border border-r-0 border-gray-300 rounded-l-md dark:text-gray-400 dark:border-gray-600"
                {...register("title", { required: true })}
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
                {...register("display_name", { required: true })}
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
            onFill = {register("Phone Number", { required: true })} />

          <FormFill
            type="email"
            text="Email Address (Optional)"
            onFill = {register("Email Address (Optional)", {})} />

          <button
            className={`absolute mt-10 bg-red-500 hover:bg-red-700 text-white text-xl font-extrabold py-4 px-4 rounded w-10/12`}
            type="submit">
            Next
          </button>

        </form>
      </div>
    </div>
  );
}
