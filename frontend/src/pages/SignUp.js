import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Buttons.js";
import Customers from "../components/Customers.js";
import { API_URL } from "../utilities/constants.js";
import BackButton from "../components/BackButton.js";
import ProgressBar from "../components/ProgressBar.js";

function getAPIData() {
	return axios.get(API_URL).then((response) => response.data);
}

export default function Landing() {
	const navigate = useNavigate();
	const [customers, setCustomers] = useState([]);

	useEffect(() => {
		let mounted = true;
		getAPIData()
			.then((items) => {
				if (mounted) {
					setCustomers(items);
				}
			})
			.catch((error) => {
				console.log(error);
			});
		return () => (mounted = false);
	}, []);

	console.log(customers);

	return (
		<div className="m-2">
			{/* TODO: Make them side by side using flex*/}
			<div className="mb-10">
				<BackButton	onClick={() => navigate("/")}/>
				<ProgressBar percent="0%" />
			</div>

			{/* TODO: Give these some style */}
			<h1 className="text-center font-bold">
				Setting up multiple accounts?
			</h1>

			<h2 className="text-center font-semibold">
				Let us making it easier for your family
			</h2>
			
			{/* TODO: Give this some height? */}
			<div className="flex flex-col px-8 space-y-3 bottom my-8">
				<Button
					text="No, just for myself only"
					bgcolor="bg-slate-500"
					onClick={() => navigate("/details")}
				/>

				{/* TODO: Add feature into another page here once multi-user is out */}
				<Button
					text="Yes, for me and my children..."
					bgcolor="bg-slate-500"
				/>
			</div>
		</div>
	);
}
