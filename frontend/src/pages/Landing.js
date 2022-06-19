import { useNavigate } from "react-router-dom";
import { Button } from "../components/Buttons.js";

export default function Landing() {
  const navigate = useNavigate();

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
      </div>
    </div>
  );
}
