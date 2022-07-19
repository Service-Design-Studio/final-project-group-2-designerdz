import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Calendar({ calendarType, curDate, setDetailsHandler }) {
  if (curDate == undefined) {
    curDate = new Date();
  } else {
    curDate = new Date(curDate);
  }
  const handleDatePickerChange = (date) => {
    setDetailsHandler((prevState) => ({
      ...prevState,
      [calendarType]: date,
    }));
  };

  return (
    <div className="calendar flex flex-row space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 stroke-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      {calendarType === "passport_expiry" ? (
        <DatePicker
          className={curDate == Date() ? "text-gray-400" : null}
          selected={curDate}
          onChange={(date) => handleDatePickerChange(date)}
          showMonthYearPicker
          showYearDropdown
          peekNextMonth
          dropdownMode="select"
          placeholderText="Passport Expiry Date"
          dateFormat="MM/yyyy"
          minDate={new Date("2021", "01")}
        />
      ) : (
        <DatePicker
          className={curDate == Date() ? "text-gray-400" : null}
          selected={curDate}
          onChange={(date) => handleDatePickerChange(date)}
          showYearDropdown
          dropdownMode="select"
          placeholderText="Date of Birth"
          dateFormatCalendar="MMMM"
          minDate={new Date("1900", "01", "01")}
          maxDate={new Date()}
          dateFormat="dd/MM/yyyy"
        />
      )}
    </div>
  );
}
