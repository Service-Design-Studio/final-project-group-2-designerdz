import { useForm } from "react-hook-form";
import { getUserDataPhoneNumber } from "../services/axiosRequests";
import { useNavigate } from "react-router-dom";

export default function Restore() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await getUserDataPhoneNumber(data.phone_number);
      let userData = response.data[0];
      localStorage.setItem("user_id", userData.id);
      switch (userData.url) {
        case "details":
          navigate("details");
          break;
        case "family":
          navigate("family");
          break;
        case "child":
          navigate("child");
          break;
        case "passport":
          navigate("passport");
          break;
        case "review":
          navigate("review");
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert(
        "user does not exist, click on 'not a customer to start a new registration!' "
      );
    }
  };
  return (
    <form
      className="flex flex-col justify-around bg-slate-50 px-2 py-4 rounded-lg shadow-lg h-[40vh]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <a className="text-center text-lg">
        Enter your phone number below to continue where you left off!
      </a>
      <input
        className="mobile_no border border-solid border-red-400 rounded w-max mx-auto p-2"
        type="number"
        placeholder="Mobile Number"
        {...register("phone_number", { required: true, maxLength: 8 })}
      />
      <button
        className="continue_btn bg-red-500 text-white rounded px-8 py-2 mx-auto my-4 w-[40vw] text-xl "
        type="submit"
      >
        Enter
      </button>
    </form>
  );
}
