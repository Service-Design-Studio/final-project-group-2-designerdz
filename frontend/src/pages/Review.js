import Button from "../components/Buttons.js";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton.js";
import ProgressBar from "../components/ProgressBar.js";

export default function Review() {
	const navigate = useNavigate();
	return (
		// TODO: Get data from the past few pages and finish here
		<div className="m-2">
			<div className="mb-10">
				<BackButton	onClick={() => navigate("/")}/>
				<ProgressBar percent="100%" />
			</div>

			{/* TODO: Beautify this using class flex for the information posted*/}
			<h1>
				<b>Review your banking details</b>
			</h1>
			<p>Display Name:</p>
			<p>Phone Number:</p>
			<p>Email:</p>

			<br></br>

			<h2>
				<b>Passport</b>
			</h2>
			<p>Full Name:</p>
			<p>Passport Number:</p>
			<p>Passport Expiry:</p>
			<p>Nationality:</p>
			<p>Gender:</p>
			<p>Date of Birth:</p>

			<Button 
				text="Submit" 
				bgcolor="bg-red-500" 
			/>
		</div>
	);
}
