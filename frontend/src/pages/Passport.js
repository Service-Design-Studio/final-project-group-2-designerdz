import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import BackButton from "../components/BackButton";
import ProgressBar from "../components/ProgressBar";
import FormFill from "../components/FormFill";

export default function Passport() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		console.log(data);
		navigate("/review");
	};
	console.log(errors);

	return (
		<div className="m-2">
			<div className="mb-10">
				<BackButton	onClick={() => navigate("/")}/>
				<ProgressBar percent="66%" />
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label 
						className="block font-medium">
							Upload Passport
					</label>

					<input
						className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
						type="file"
						placeholder="Passport"
						{...register("Passport", { required: true })}
					/>
				</div>

				<FormFill text="Full Name"/>
				<FormFill text="Passport Number"/>

				<div className="mb-3">
					<label 
						className="block font-medium">
							Passport Expiry (MM/YY)
					</label>

					{/* TODO: Make this button correctly to work with proper dates */}
					<div className="flex">
						<select 
							className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
							{...register("Date of Birth", { required: true })}>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</select>

						<select 
							className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
							{...register("Date of Birth", { required: true })}>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</select>						
					</div>
				</div>

				<FormFill text="Nationality"/>

				<div className="mb-3">
					<label 
						className="block font-medium">
							Gender
					</label>

					{/* TODO: Make this button clickable like pills upon selection */}
					<div className="flex">
						<select 
							className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
							{...register("Date of Birth", { required: true })}>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</select>

						<select 
							className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
							{...register("Date of Birth", { required: true })}>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</select>	
					</div>
				</div>

				<div className="mb-3">
					<label 
						className="block font-medium">
							Date of Birth (DD/MM/YYYY)
					</label>

					{/* TODO: Make this button correctly to work with proper dates */}
					<div className="flex">
						<select 
							className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
							{...register("Date of Birth", { required: true })}>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</select>

						<select 
							className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
							{...register("Date of Birth", { required: true })}>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</select>			

						<select 
							className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
							{...register("Date of Birth", { required: true })}>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</select>			
					</div>
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
