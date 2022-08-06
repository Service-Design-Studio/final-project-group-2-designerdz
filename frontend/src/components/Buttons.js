function Button({ name, text, bgColor, hoverColor, onClick, familyData }) {
  let familyValid = true;
  if (familyData) {
    for (let i = 0; i < familyData.length; i++) {
      if (familyData[i].status === false) {
        familyValid = false;
      }
    }
  }
  if (familyValid == false) {
    bgColor = "bg-gray-200";
    hoverColor = "bg-gray-300";
  }
  return (
    <button
      className={`${name} ${bgColor} ${hoverColor} text-white text-xl font-extrabold mt-4 py-4 px-4 rounded w-full`}
      type="submit"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

function BackButton({ onClick }) {
  return (
    <button className="back absolute left-4 top-5" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 stroke-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
}

function EditButton({ name, onClick }) {
  return (
    <button className={name} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    </button>
  );
}

function AddChildrenButton({ onClick }) {
  return (
    <button
      className="add rounded outline outline-1 outline-gray-300 py-4 text-center flex items-center
      justify-center mt-4"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 fill-red-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
      <b className="ml-2 text-xl text-red-500">Add a child account</b>
    </button>
  );
}

function DeleteImageButton({ passportFile, onClick }) {
  return (
    <button
      type="button"
      className={`btn_delete ${
        passportFile == undefined ? "hidden" : null
      } rounded outline outline-1 outline-gray-300 px-4 py-2 text-center text-red-500 self-end mt-2`}
      onClick={onClick}
    >
      Remove Photo
    </button>
  );
}

export { Button, BackButton, EditButton, AddChildrenButton, DeleteImageButton };
