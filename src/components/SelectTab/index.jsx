import { FaCalendarAlt } from "react-icons/fa";

const SelectTab = ({ label, active, onClick }) => {
  const buttonStyle = {
    height: "2.2em",
    border: active
      ? "1px solid var(--primary-color)"
      : "1.5px solid var(--grey-40)",
    color: active ? "var(--primary-color)" : "var(--grey-50)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "4px",
    padding: "0px 20px",
    textWrap: "nowrap",
    width: "auto",
    fontWeight: active ? "var(--semibold)" : "var(--regular)",
    minWidth: "9em",
  };
  return (
    <div style={buttonStyle} onClick={onClick}>
      {label}
    </div>
  );
};
export default SelectTab;

export const DateRangeTab = ({ onClick }) => {
  const buttonStyle = {
    height: "2.2em",
    border: "1.5px solid var(--grey-40)",
    color: "var(--grey-50)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "4px",
    padding: "20px",
    textWrap: "nowrap",
    width: "auto",
    fontWeight: "var(--regular)",
  };
  return (
    <div style={buttonStyle} onClick={onClick}>
      Date Range{" "}
      <span style={{ marginLeft: "10px" }}>
        <FaCalendarAlt />
      </span>
    </div>
  );
};
