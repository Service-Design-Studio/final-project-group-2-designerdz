import { useNavigate } from "react-router-dom";

import { BackButton } from "../components/Buttons.js";
import ProgressBar from "../components/ProgressBar.js";
import TextDesc from "../components/TextDesc.js";

export default function SignUp() {
  const navigate = useNavigate();

  function onClickSingle() {
    navigate("/details", { state: { is_family: false } });
  }

  function onClickFamily() {
    navigate("/details", { state: { is_family: true } });
  }

  return (
    <div>
      <div className="flex flex-end">
        <BackButton onClick={() => navigate("/")} />
        <ProgressBar percent="0%" />
      </div>
      <TextDesc
        headerText="Setting up multiple accounts?"
        bodyText="Let us make it easier for your family"
      />

      <div className="flex flex-col absolute w-screen items-center top-0 bottom-0 m-auto place-content-center space-y-4 -z-50">
        <button
          className="next relative hover:bg-red-200 bg-slate-100 text-2xl font-semibold h-1/4 w-10/12 rounded outline outline-2 outline-slate-300 hover:outline-red-400"
          onClick={onClickSingle}
        >
          No, just for myself only
        </button>

        <button
          className="family-next relative hover:bg-red-200 bg-slate-100 text-2xl font-semibold h-1/4 w-10/12 rounded outline outline-2 outline-slate-300 hover:outline-red-400"
          onClick={onClickFamily}
        >
          Yes, for me and my children...
        </button>
        <p className="absolute bottom-12 mb-10 mx-8 w-10/12 ">
          Only have a little time? <br />
          Don't worry, as your <b>data will be saved at every step!</b>
        </p>
      </div>
    </div>
  );
}
