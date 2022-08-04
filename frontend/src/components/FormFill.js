export default function FormFill({ text, type, onFill, name, autofill }) {
  return (
    <div className="mb-3">
      <label className="block font-medium">{text}</label>
      <input
        type={type}
        className={`${name} ${
          autofill
            ? "bg-gray-300 select-none text-gray-500"
            : "bg-gray-100 text-gray-900"
        } border border-gray-300  text-sm rounded-lg w-full p-2.5 `}
        placeholder={text}
        disabled={autofill}
        {...onFill}
      />
    </div>
  );
}
