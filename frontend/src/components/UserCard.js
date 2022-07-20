function UserCardSelected({ id, name, onClick, index, status }) {
  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      id={`${id}`}
      className="grid rounded outline-dashed grid-cols-1 justify-items-center h-24 w-24 p-2 text-sm overflow-hidden"
    >
      {status ? null : <p id ={`incomplete_${index}`} className="text-red-600">i</p>}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
      <p className={`user_${index} text-center `}>{name}</p>
    </button>
  );
}
function UserCardNotSelected({ id, name, onClick, index, status }) {
  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      id={`${id}`}
      className="grid grid-cols-1 justify-items-center h-24 w-24 p-2 text-sm overflow-hidden"
    >
            {status ? null : <p id ={`incomplete_${index}`} className="text-red-600">i</p>}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      <p id={`userText_${index}`} className={`user_${index} text-center`}>
        {name}
      </p>
    </button>
  );
}

export { UserCardSelected, UserCardNotSelected };
