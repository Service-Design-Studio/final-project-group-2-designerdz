import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFormContext } from "react-hook-form";

export default function Calendar({
  calendarType,
  defaultDate,
  setDetailsHandler,
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleDateChange = (date, name) => {
    console.log(name);
    setDetailsHandler((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  return (
    <>
      {calendarType === "passport_expiry" ? (
        <>
          <Controller
            control={control}
            name="passport_expiry"
            rules={{ required: "passport expiry is required!" }}
            render={({ field }) => (
              <DatePicker
                className={
                  new Date(defaultDate) == Date() ? "text-gray-400" : null
                }
                placeholderText="Select Date"
                showMonthYearPicker
                dateFormat="MM/yyyy"
                minDate={new Date()}
                onChange={(date) => {
                  field.onChange(date);
                  handleDateChange(date, field.name);
                }}
                selected={
                  defaultDate == undefined ? null : new Date(defaultDate)
                }
              />
            )}
          />
          {errors.passport_expiry && (
            <p className="text-red-500">{errors.passport_expiry?.message}</p>
          )}
        </>
      ) : (
        <>
          <Controller
            control={control}
            name="dob"
            rules={{ required: "date of birth is required!" }}
            render={({ field }) => (
              <DatePicker
                className={
                  new Date(defaultDate) == Date() ? "text-gray-400" : null
                }
                placeholderText="Select Date of Birth"
                showYearDropdown
                dropdownMode="select"
                dateFormatCalendar="MMMM"
                minDate={new Date("1900", "01", "01")}
                maxDate={new Date()}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => {
                  field.onChange(date);
                  handleDateChange(date, field.name);
                }}
                selected={
                  defaultDate == undefined ? null : new Date(defaultDate)
                }
              />
            )}
          />
          {errors.dob && <p className="text-red-500">{errors.dob?.message}</p>}
        </>
      )}
    </>
  );
}
