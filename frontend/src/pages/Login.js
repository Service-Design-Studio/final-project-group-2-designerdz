import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log("Submitted");
    console.log(data);
    navigate("/landing");
  };
  console.log(errors);

  // TODO: Think of how to use this form to get the login state. Should the loggedIn boolean be passed back up to App.js?
  return (
    <form
      className="flex flex-col justify-around bg-gray-300 mx-0 my-auto px-2 py-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="border border-solid border-red-400 rounded w-max mx-auto"
        type="number"
        placeholder="Mobile Number"
        {...register("Mobile Number", { required: true, maxLength: 8 })}
      />
      <input
        className="bg-red-700 text-white rounded w-max px-8 py-2 mx-auto my-4"
        type="submit"
      />
    </form>
  );
}
