function Button({ name, text, bgColor, hoverColor, onClick }) {
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

function EditButton({ onClick }) {
  return (
    <button className="edit" onClick={onClick}>
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

export { Button, BackButton, EditButton };
