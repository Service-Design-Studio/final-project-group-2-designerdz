import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFormContext } from "react-hook-form";

export default function Calendar({ calendarType, defaultDate }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  switch (calendarType) {
    case "passport_expiry":
      return passportExpiryCalendar(control, errors, defaultDate);
    case "dob":
      return birthDateCalendar(control, errors, defaultDate);
    default:
      return;
  }
}

function passportExpiryCalendar(control, errors, defaultDate) {
  return (
    <Controller
      name={"passport_expiry"}
      control={control}
      defaultValue={defaultDate}
      rules={{ required: "Passport Expiry is Required" }}
      render={({ field: { onChange, value } }) => {
        return (
          <>
            <DatePicker
              onChange={onChange}
              selected={value}
              placeholderText="Enter Passport Expiry date"
              dateFormat="dd/MM/yyyy"
              showYearDropdown
              dropdownMode="select"
              dateFormatCalendar="MMMM"
              minDate={new Date()}
              maxDate={new Date("2050", "01", "01")}
            />
            {errors.passport_expiry && (
              <p className="text-red-500">{errors.passport_expiry?.message}</p>
            )}
          </>
        );
      }}
    />
  );
}

function birthDateCalendar(control, errors, defaultDate) {
  return (
    <Controller
      name={"dob"}
      control={control}
      defaultValue={defaultDate}
      rules={{ required: "Birth Date is Required" }}
      render={({ field: { onChange, value } }) => {
        return (
          <>
            <DatePicker
              onChange={onChange}
              selected={value}
              placeholderText="Select Date of Birth"
              showYearDropdown
              dropdownMode="select"
              dateFormatCalendar="MMMM"
              minDate={new Date("1900", "01", "01")}
              maxDate={new Date()}
              dateFormat="dd/MM/yyyy"
            />
            {errors.dob && (
              <p className="text-red-500">{errors.dob?.message}</p>
            )}
          </>
        );
      }}
    />
  );
}
