import Button from "../components/Buttons.js";
import { useNavigate } from "react-router-dom";

export default function Passport() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Passport</h1>
      <Button
        text="NEXT"
        bgcolor="bg-green-500"
        hovercolor="hover:bg-cyan-500"
        onClick={() => navigate("/review")}
      />
    </div>
  );
}
