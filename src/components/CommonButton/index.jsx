import React from "react";

const CommonButton = ({
  icon,
  label,
  onClick,
  height,
  type,
  fullWidth,
  isDisabled = false,
}) => {
  const buttonStyle = {
    height: height ? "2.2em" : "auto",
    border: "2px solid var(--primary-color)",
    color: type === "filled" ? "white" : "var(--primary-color)",
    backgroundColor: type === "filled" ? "var(--primary-color)" : "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: isDisabled ? "default" : "pointer",
    borderRadius: "4px",
    padding: `0px ${icon ? "10px" : "20px"}`,
    textWrap: "nowrap",
    width: fullWidth ? "100%" : "auto",
    opacity: isDisabled ? "0.5" : "1",
  };
 

  const iconStyle = {
    height: "1.2em",
    width: "1.2em",
    marginRight: "0.5em",
  };

  return (
    <button style={buttonStyle} onClick={onClick} disabled={isDisabled} className={'my-button'}>
      {icon && <img src={icon} alt="icon" style={iconStyle} />}
      {label}
    </button>
  );
};

export default CommonButton;
