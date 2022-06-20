import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { API_URL } from "../utilities/constants.js";
import ProgressBar from "../components/ProgressBar";
import { Button, BackButton } from "../components/Buttons.js";
import TextDesc from "../components/TextDesc.js";
import { postUserData } from "../services/axiosUsers";

export default function Details() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //post request to database backend
  const onSubmit = (data) => {
    let posted = true;
    postUserData(data, API_URL)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
    return () => (posted = false);
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
                {...register("Title", { required: true })}
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
                {...register("Last / Display Name", { required: true })}
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

          <div className="mb-6">
            <label className="block font-medium">Phone Number</label>
            <input
              type="number"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Phone Number"
              {...register("Phone Number", { required: true })}
            />
          </div>

          <div className="mb-15">
            <label className="block font-medium">
              Email Address (Optional)
            </label>
            <input
              type="email"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email Address (Optional)"
              {...register("Email Address (Optional)", {})}
            />
          </div>
        </form>
      </div>

      <div className="flex flex-col absolute w-screen bottom-0 mb-10 space-y-4 items-center">
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
  );
}
