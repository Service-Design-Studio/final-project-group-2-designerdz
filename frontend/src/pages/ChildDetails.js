import { useNavigate } from "react-router-dom";
import {
    Button,
    BackButton,
    AddChildrenButton,
  } from "../components/Buttons.js";
  import TextDesc from "../components/TextDesc.js";
  import ProgressBar from "../components/ProgressBar";

export default function ChildDetails() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex flex-end">
                <BackButton onClick={() => navigate("/family")} />
                <ProgressBar percent="33%" />
            </div>
            <TextDesc
                headerText="Tell me about yourself first"
                bodyText="sth know you better sth know you better"
            />
        </div>

    )
}