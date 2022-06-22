import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Restore() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const onSubmit = (data) => {
		navigate("/signup");
	};
	console.log(errors);
	return (
		<form
			className="flex flex-col justify-around bg-gray-300 mx-0 my-auto px-2 py-4 rounded-lg h-64"
			onSubmit={handleSubmit(onSubmit)}
			>
			<input
				className="mobile_no border border-solid border-red-400 rounded w-max mx-auto"
				type="number"
				placeholder="Mobile Number"
				{...register("Mobile Number", { required: true, maxLength: 8 })}
			/>
			<input
				className="continue_btn bg-red-700 text-white rounded w-max px-8 py-2 mx-auto my-4"
				type="submit"
			/>
		</form>
	);
}
