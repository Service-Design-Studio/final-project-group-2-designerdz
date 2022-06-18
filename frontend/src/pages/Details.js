import Button from "../components/Buttons.js";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

export default function Details() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data);
    navigate("/passport")
  }
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <select {...register("Title", { required: true })}>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Ms">Ms</option>
          <option value="Mdm">Mdm</option>
          <option value="Dr">Dr</option>
        </select>
        <input type="text" placeholder="Last / Display Name" {...register("Last / Display Name", {required: true})} />
      </div>
      <input className="w-full" type="number" placeholder="Phone Number" {...register("Phone Number", {required: true})} />
      <input className="w-full" type="email" placeholder="Email Address (Optional)" {...register("Email Address (Optional)", {})} />
      <input className="w-full bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded" type="submit" />
    </form>
  );
}
