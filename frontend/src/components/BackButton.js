export default function BackButton({ onClick}) {
    return (
      <button
        className={"ml-5 mt-5 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-0.8"}
        onClick={onClick} >
        Back
      </button>
    );
  }