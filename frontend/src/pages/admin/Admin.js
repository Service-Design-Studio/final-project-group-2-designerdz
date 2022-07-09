import axios from "axios";

export default function Admin() {
  const onClickDelete = () => {
    axios
      .delete() //need replace with deletion url
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
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
