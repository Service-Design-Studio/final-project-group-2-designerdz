export default function ProgressBar({ percent }) {
  return (
    <div className="absolute left-1/4 top-5 w-3/5">
      <div className="text-base font-medium text-center">{percent}</div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-amber-500 h-2.5 rounded-full"
          style={{ width: percent }}
        ></div>
      </div>
    </div>
  );
}
