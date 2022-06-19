export default function TextDesc({ headerText, bodyText }) {
  return (
    <div className="absolute mx-auto top-20 w-10/12 text-center left-0 right-0">
      <h1 className="text-xl font-bold">{headerText}</h1>
      <h3>{bodyText}</h3>
    </div>
  );
}
