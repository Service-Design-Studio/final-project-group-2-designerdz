import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { API_URL } from "../utilities/constants";
import axios from "axios";

export default function Details() {
	const navigate = useNavigate();
	// const [info, setInfo] = useState({
		
	// });

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		console.log(data);

		/* PROBLEM: active record not properly updating fields
			TODO: fix this in backend, find out how to create new rows with given in the form below
			Getting NoMethodError in Api::V1::UserController#create
		 */

		const test = {
			title: "Mr",
			display_name: "John Doe",
			phone_number: "1234567890",
			email: "123@gmail.com"
		};

		axios.post(API_URL, data, { headers: { 'Content-Type': 'application/json' }})
		.then(response => {console.log(response.data)})
        .catch(error => {console.log(error.response.data)});
		navigate("/passport");
	};
	console.log(errors);
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<select {...register("title", { required: true })}>
					<option value="Mr">Mr</option>
					<option value="Mrs">Mrs</option>
					<option value="Ms">Ms</option>
					<option value="Mdm">Mdm</option>
					<option value="Dr">Dr</option>
				</select>
				<input
					type="text"
					placeholder="Last / Display Name"
					{...register("display_name", { required: true })}
				/>

				<h3>
					This is how you will be acknowledged on PayLah! and
					digibank.
					<a href="google.com"> Find out more</a>
				</h3>
			</div>
			<input
				className="w-full"
				type="number"
				placeholder="Phone Number"
				{...register("phone_number", { required: true })}
			/>
			<input
				className="w-full"
				type="email"
				placeholder="Email Address (Optional)"
				{...register("email", {})}
			/>
			<input
				className="w-full bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
				type="submit"
			/>
		</form>
	);
}
