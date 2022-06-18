import Button from "../components/Buttons.js";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

export default function Passport() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data);
    navigate("/review");
  }
  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
      <input type="file" placeholder = "Passport" {...register("Passport", {required: true})} />
      <input type="text" placeholder="Full Name" {...register("Full Name", {required: true})} />
      <input type="text" placeholder="Passport Number" {...register("Passport Number", {required: true})} />
      <input type="datetime" placeholder="Passport Expiry" {...register("Passport Expiry", {})} />
      <input type="text" placeholder="Nationality" {...register("Nationality", {required: true})} />
      <select {...register("Gender", { required: true })}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input type="datetime" placeholder="Date of Birth" {...register("Date of Birth", {required: true})} />
      <input type="submit" className="w-full bg-red-500" />
  </form>
  );
}
