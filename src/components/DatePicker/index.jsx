import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
export default function CustomDatePicker({ selected, onChange }) {
  const [startDate, setStartDate] = useState(new Date());
  const buttonStyle = {
    height: "2.2em",
    border: "1.5px solid var(--grey-40)",
    color: "var(--grey-50)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "4px",
    padding: "20px",
    textWrap: "nowrap",
    width: "12rem",
    fontWeight: "var(--regular)",
    background: "var(--grey-15)",
  };
  const CustomInput = React.forwardRef((props, ref) => {
    return (
      <div onClick={props.onClick} style={buttonStyle}>
        <label ref={ref}>{props.value || props.placeholder}</label>
        <FaCalendarAlt style={{ color: "#433d3d" }} />
      </div>
    );
  });
  return (
    <DatePicker
      placeholder="DD MMM YYYY"
      dateFormat="dd/MMM/yyyy"
      // selected={selected}
      // onChange={onChange}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<CustomInput />}
      onKeyDown={(e) => {
        e.preventDefault();
      }}
    />
  );
}
