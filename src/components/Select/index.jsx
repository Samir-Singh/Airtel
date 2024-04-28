import React from "react";
import Select from "react-select";
import { FaAngleDown } from "react-icons/fa6";

const CustomInput1 = () => {
  return <FaAngleDown style={{ position: "absolute", right: "10px" }} />;
};

const CustomSelect = ({
  isMulti,
  value,
  onChange,
  options,
  placeholder,
  disable,
  isClearable,
  backgroundColor,
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: `1px solid ${backgroundColor || "var(--grey-15)"}`,
      borderRadius: "4px",
      backgroundColor: backgroundColor || `var(--grey-15)`,
      minHeight: `2.9em`,
      boxShadow: state.isFocused ? `0 0 0 1px var(--primary-color)` : null,
      "&:hover": {
        border: `1px solid var(--primary-color)`,
      },
      ...(state.isDisabled && {
        opacity: 0.6,
      }),
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? `var(--primary-color)` : "white",
      "&:hover": {
        backgroundColor: `var(--primary-color)`,
        color: "white",
      },
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),

    indicatorSeparator: () => ({ display: "none" }),

    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#007bff",
    }),

    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#cacaca",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      padding: "2px 8px",
      margin: "2px",
      color: "white",
    }),

    multiValueLabel: (provided) => ({
      ...provided,
    }),

    multiValueRemove: (provided) => ({
      ...provided,
      color: "black",
      ":hover": {
        backgroundColor: "transparent",
        color: "var(--primary-color)",
      },
    }),
  };

  return (
    <Select
      isMulti={isMulti}
      value={value}
      onChange={onChange}
      options={options}
      styles={customStyles}
      placeholder={placeholder}
      hideSelectedOptions={false}
      components={{
        DropdownIndicator: () => CustomInput1(),
        IndicatorSeparator: () => null,
      }}
      isDisabled={disable}
      isClearable={isClearable}
    />
  );
};
export default CustomSelect;
