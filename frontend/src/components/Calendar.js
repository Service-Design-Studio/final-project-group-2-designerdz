import React, { useEffect, useState } from "react";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Calendar({calendarType, curDate, setDetailsHandler}) {
  if (curDate == undefined){
    curDate = new Date()
  } else {
    curDate = new Date(curDate);
  }
  const handleDatePickerChange = (date) => {
    setDetailsHandler (
      prevState => ({
        ...prevState,
        [calendarType]: date
      })
    )
  }

  return (
      (calendarType === "passport_expiry") 
      ? <DatePicker
          selected = {curDate}
          onChange = {(date) => handleDatePickerChange(date)}
          showMonthDropdown
          showYearDropdown
          dropdownMode = "select"
          placeholderText ="Passport Expiry Date"
          dateFormat ="MM/yyyy"
          minDate={new Date("2021", "01")}
          />
      : <DatePicker
          selected = {curDate}
          onChange = {(date) => handleDatePickerChange(date)}
          showMonthDropdown
          showYearDropdown
          dropdownMode = "select"
          placeholderText ="Date of Birth"
          minDate = {new Date("1900", "01", "01")}
          maxDate = {new Date()}
          dateFormat ="dd/MM/yyyy"
          />
    );
  
  }





