export default function Button({ text, bgcolor, hovercolor, onClick }) {
  return (
    <button
      className={`${bgcolor} ${hovercolor} text-white font-bold py-2 px-4 rounded w-0.8`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
