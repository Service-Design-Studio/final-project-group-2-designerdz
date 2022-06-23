import { useNavigate } from "react-router-dom";
import { Button } from "../components/Buttons.js";
import Popup from "reactjs-popup";
import Restore from "./Restore.js";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      <img
        className="px-8 space-y-3 bottom my-20"
        src="https://1000logos.net/wp-content/uploads/2020/04/DBS-logo.jpg"
        alt="DBS Logo"
      />
      <div className="flex flex-col absolute bottom-0 mb-10 mx-8 space-y-4 items-center">
        <Button
          text="NOT A CUSTOMER YET?"
          bgColor="bg-red-500"
          hoverColor="hover:bg-red-700"
          onClick={() => navigate("/signup")}
        />
        <Button
          text="LOG IN"
          bgColor="bg-slate-600"
          hoverColor="hover:bg-slate-800"
          onClick={() => alert("Sorry we are not DBS!")}
        />
        <Popup
          trigger={
            <button className="button">
              <a>
                Left registration midway?{" "}
                <span className="underline">Continue where you left.</span>
              </a>{" "}
            </button>
          }
        >
          <div className="fixed top-2/4 left-0 right-0">
            <div className="w-8/12 m-auto">
              <Restore />
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}
