import { deleteAllData } from "../../services/axiosRequests.js";

export default function Admin() {
  const onClickDelete = () => {
    try {
      deleteAllData();
      alert("You have successfully deleted all data in database!!");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center">
      <button
        className="bg-red-700 h-fit w-fit text-slate-100 text-xl p-4 m-4 font-bold"
        onClick={onClickDelete}
      >
        Clear all user data in production database!
      </button>
    </div>
  );
}
