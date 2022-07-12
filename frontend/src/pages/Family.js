import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  BackButton,
  AddChildrenButton,
} from "../components/Buttons.js";
import TextDesc from "../components/TextDesc.js";
import ProgressBar from "../components/ProgressBar";
import {
  getAllChildrenData,
  getUserDataId,
  deleteChildData,
} from "../services/axiosRequests.js";

export default function Family() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const [familyMembers, setFamilyMembers] = useState([]);
  let userData;
  let childrenData;
  let userId = localStorage.getItem("user_id");
  console.log("userId is " + userId);

  useEffect(() => {
    async function fetchData() {
      console.log(details.length == undefined);
      console.log(details);
      if (details.length == undefined) {
        try {
          const userResponse = await getUserDataId(userId);
          userData = userResponse.data[0];
          setDetails(userData);

          const childrenResponse = await getAllChildrenData(userId);
          childrenData = childrenResponse.data.slice(1);
          setFamilyMembers(childrenData);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, []);

  function onEditClick(childId) {
    navigate("/child", {
      state: {
        parent_id: details.id,
        child_id: childId,
        phone_number: details.phone_number,
        email: details.email,
      },
    });
  }

  function onRemoveClick(childId) {
    // iterate through familyMembers array and remove the child with the given name
    for (let i = 0; i < familyMembers.length; i++) {
      if (familyMembers[i].id === childId) {
        setFamilyMembers(
          familyMembers.slice(0, i).concat(familyMembers.slice(i + 1))
        );
      }
    }
    deleteChildData(childId);
  }

  function onAddClick() {
    navigate("/child", {
      state: {
        parent_id: details.id,
        phone_number: details.phone_number,
        email: details.email,
      },
    });
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
              <p>{details.title + " " + details.display_name}</p>
            </div>
          </div>
          {familyMembers.map((child, index) => {
            return (
              <div
                className="rounded outline outline-1 outline-gray-300 py-6"
                key={child.name}
              >
                <div className="grid grid-cols-2 px-4">
                  <p id={`${"name_".concat(index)}`}>
                    {child.title + " " + child.display_name}
                  </p>
                  <b className="text-right">
                    <button
                      id={`${"edit_".concat(index)}`}
                      onClick={() => onEditClick(child.id)}
                    >
                      Edit
                    </button>
                    <button
                      id={`${"delete_".concat(index)}`}
                      onClick={() => onRemoveClick(child.id)}
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
