import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  BackButton,
  AddChildrenButton,
} from "../components/Buttons.js";
import TextDesc from "../components/TextDesc.js";
import ProgressBar from "../components/ProgressBar";
import { getUserDataId } from "../services/axiosUsers.js";

// TODO: DELETE request to API with childName
// TODO: Finalise schema of children, figure out whether familyMembers should be a state

export default function Family() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const [familyMembers, setFamilyMembers] = useState([
    { name: "child1" },
    { name: "child2" },
    { name: "child3" },
  ]);

  let userData;
  let userId = localStorage.getItem("user_id");
  console.log("userId is " + userId);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getUserDataId(userId); //TODO: change this to api that gets parent + child details
        userData = response.data[0];
        console.log("family userData is: " + userData);
        setDetails(userData);
      } catch (error) {
        console.log(error.reponse);
      }
    }

    fetchData();

    // getUserData(GET_USER_URL, phoneNumber).then((response) => {
    //   userData = response.data[0];
    //   setDetails(userData);
    // });
  });

  //TODO: need to pass childId to "/child"
  function onEditClick(childId) {
    navigate("/child", {
      state: { phoneNumber: details[0].id, childId: childId },
    });
  }

  function onRemoveClick(childName) {
    console.log(familyMembers);
    // iterate through familyMembers array and remove the child with the given name
    for (let i = 0; i < familyMembers.length; i++) {
      if (familyMembers[i].name === childName) {
        setFamilyMembers(
          familyMembers.slice(0, i).concat(familyMembers.slice(i + 1))
        );
      }
    }
    //TODO: rmb to do api call to delete child data
    console.log(familyMembers);
  }

  function onAddClick() {
    navigate("/child", { state: { phoneNumber: details[0].id } });
  }

  return (
    <div>
      <div className="flex flex-end">
        <BackButton onClick={() => navigate("/details")} />
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
          {familyMembers.map((child) => {
            return (
              <div
                className="rounded outline outline-1 outline-gray-300 py-6"
                key={child.name}
              >
                <div className="grid grid-cols-2 px-4">
                  <p>{child.name}</p>
                  <b className="text-right">
                    <button onClick={() => onEditClick(child.id)}>Edit</button>
                    <button
                      className="text-gray-300"
                      onClick={() => onRemoveClick(child.name)}
                    >
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
