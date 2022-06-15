export default function Button({text, color, onClick}) {
  return (
    <button className= {`{ ${color}-500 hover:${color}-700 text-white font-bold py-2 px-4 rounded w-full`} onClick={onClick}>
      {text}
    </button>
  );
}

