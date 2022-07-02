import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  BackButton,
  AddChildrenButton,
} from "../components/Buttons.js";
import TextDesc from "../components/TextDesc.js";
import ProgressBar from "../components/ProgressBar";

export default function Family() {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(2);
  const [familyMembers, setFamilyMembers] = useState([]);

  function onEditClick() {
    console.log("onEditClick clicked lo");
    navigate("/details");
  }

  function onRemoveClick() {
    console.log("onRemoveClick clicked lo");
    //remove the element from the list ba
  }

  function onAddClick() {
    console.log("onAddClick clicked lo");
    navigate("/childDetails");
    setCounter(counter + 1);
    setFamilyMembers([...familyMembers, { name: `Family Member ${counter}` }]);
    console.log(familyMembers);
  }

  return (
    <div>
      <div className="flex flex-end">
        <BackButton onClick={() => navigate("/signup")} />
        <ProgressBar percent="33%" />
      </div>

      <TextDesc headerText="Family Details" bodyText="ssth sth about family" />
      <div className="absolute top-[25%] w-full px-8 ">
        <b className="text-l">All Family Members</b>

        <div className="grid grid-cols-1 gap-2 mt-4">
          <div className="rounded outline outline-1 outline-gray-300 py-6">
            <div className="grid grid-cols-2 px-4">
              <p>Mrs Sally Abbott</p>
              <b className="text-right">
                <button onClick={() => navigate("/details")}>Edit</button>
              </b>
            </div>
          </div>
          {familyMembers.map((member) => {
            return (
              <div
                className="rounded outline outline-1 outline-gray-300 py-6"
                key={member.name}
              >
                <div className="grid grid-cols-2 px-4">
                  <p>{member.name}</p>
                  <b className="text-right">
                    <button onClick={onEditClick}>Edit</button>
                    <button className="text-gray-300" onClick={onRemoveClick}>
                      &nbsp;/ Remove
                    </button>
                  </b>
                </div>
              </div>
            );
          })}

          <AddChildrenButton onClick={onAddClick} />
        </div>
        <div className="rounded bg-gray-300 mt-10 p-4 ">
          <p className="text-base">
            You can add as many Joint-Alternate My Accounts for your children.
            <br />
            <br />
            Click on "+ Add a child account" to do so!
          </p>
        </div>
        <Button
          name="next"
          text="Next"
          bgColor="bg-red-500"
          hoverColor="hover:bg-red-700"
          onClick={() => navigate("/passport")}
        />
      </div>
    </div>
  );
}
