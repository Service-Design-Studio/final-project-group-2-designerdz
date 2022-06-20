import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/Buttons.js";
import Customers from "../components/Customers.js";
import { API_URL } from "../utilities/constants.js";

function getAPIData() {
	return axios.get(API_URL).then((response) => response.data);
}

export default function Landing() {
	const navigate = useNavigate();

	// initialize state using hooks, returns the current state and a function to update it
	const [customers, setCustomers] = useState([]);

	useEffect(() => {
		let mounted = true;
		getAPIData()
		// then and catch are part of axios promise-based library
		// use then to handle promise if fulfilled and use catch to handle promise if rejected
			.then((items) => {
				if (mounted) {
					// add data to state
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
		  <img
			className="px-8 space-y-3 bottom my-20"
			src="https://1000logos.net/wp-content/uploads/2020/04/DBS-logo.jpg"
			alt="DBS Logo"
		  />
		  <div className="flex flex-col absolute w-screen bottom-0 mb-10 space-y-4 items-center">
			<Button
			  text="NOT A CUSTOMER YET?"
			  bgcolor="bg-red-500"
			  hovercolor="hover:bg-red-700"
			  onClick={() => navigate("/signup")}
			/>
			<Button
			  text="LOG IN"
			  bgcolor="bg-slate-600"
			  hovercolor="hover:bg-slate-800"
			  onClick={() => alert("Sorry we are not DBS!")}
			/>
		  </div><Customers customers={customers} />
		</div>
	  );
}
