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
          className="next bg-gray-300 hover:bg-red-200 text-xl font-semibold h-1/3 rounded w-10/12"
          onClick={onClickSingle}
        >
          No, just for myself only
        </button>

        <button
          className="family-next hover:bg-red-200 text-xl font-semibold h-1/3 rounded w-10/12 opacity-30 -z-20 bg-[url('https://www.ocbc.com/assets/images/uploads/inside_lifegoals/articles/deciding-mast-1.jpg')]"
          onClick={onClickFamily}
        >
          <span className="z-10 opacity-100">
            Yes, for me and my children...
          </span>
        </button>

        <p className="absolute bottom-12 mb-10 mx-8 w-10/12 ">
          Only have a little time? <br />
          Don't worry, as your <b>data will be saved at every step!</b>
        </p>
      </div>
    </div>
  );
}
