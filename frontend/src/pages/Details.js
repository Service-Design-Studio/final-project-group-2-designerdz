import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import BackButton from "../components/BackButton";
import ProgressBar from "../components/ProgressBar";

export default function Details() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		console.log(data);
		navigate("/passport");
	};
	console.log(errors);
	return (
		<div className="m-2">
			<div className="mb-10">
				<BackButton	onClick={() => navigate("/")}/>
				<ProgressBar percent="33%" />
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label 
						className="block font-medium">
							Given Name
					</label>

					<div className="flex">
						<select 
							className="inline-flex items-center px-3 text-sm border border-r-0 border-gray-300 rounded-l-md dark:text-gray-400 dark:border-gray-600"
							{...register("Title", { required: true })}>
							<option value="Mr">Mr</option>
							<option value="Mrs">Mrs</option>
							<option value="Ms">Ms</option>
							<option value="Mdm">Mdm</option>
							<option value="Dr">Dr</option>
						</select>

						<input
							type="text"  
							class="rounded-none rounded-r-lg border focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
							placeholder="Last / Display Name"
							{...register("Last / Display Name", { required: true })}
						/>					
					</div>

					<h3 className="opacity-50 text-xs mb-2">
						This is how you will be acknowledged on PayLah! and
						digibank. 
						<a 
							className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
							href="https://google.com"> 
							Find out more
						</a>
					</h3>
				</div>

				<div class="mb-3">
					<label 
						className="block font-medium">
							Phone Number
					</label>
					<input 
						type="number" 
						className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
						placeholder="Phone Number"
						{...register("Phone Number", { required: true })}
					/>
				</div>

				<div class="mb-3">
					<label 
						className="block font-medium">
							Email Address (Optional)
					</label>
					<input 
						type="email" 
						className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
						placeholder="Email Address (Optional)"
						{...register("Email Address (Optional)", {})}
					/>
				</div>

				<input
					className="w-full bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
					type="submit"
					value="Next Step"
				/>
			</form>
		</div>
	);
}
