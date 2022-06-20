function Button({ text, bgcolor, hovercolor, onClick }) {
  return (
    <button
      className={`next ${bgcolor} ${hovercolor} text-white text-xl font-extrabold py-4 px-4 rounded w-10/12`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

function BackButton({ onClick }) {
  return (
    <button className="absolute left-4 top-5" onClick={onClick}>
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

export { Button, BackButton };
