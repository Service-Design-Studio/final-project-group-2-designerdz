import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Buttons.js";
import Customers from "../components/Customers.js";
import { API_URL } from "../utilities/constants.js";

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
		<div>
			<Button text="Back" bgcolor="bg-gray-500" />

			{/* FIXME: Can this back button be a common feature in all? */}

			{/* TODO: Add in progress bar here */}

			<h1>Setting up multiple accounts?</h1>
			<h2>Let us making it easier for your family</h2>

			<Button
				text="No, just for myself only"
				bgcolor="bg-slate-500"
				onClick={() => navigate("/details")}
			/>

			<Button
				text="Yes, for me and my children..."
				bgcolor="bg-slate-500"
			/>
		</div>
	);
}
