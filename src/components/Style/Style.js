export const userManagementSelect = {
  control: (style, state) => ({
    ...style,
    boxShadow: "0px 3px 9px #00000029",
    borderRadius: "9px",
    background: state.isDisabled ? "#999" : "f5f6fa",
    backgroundColor:
      // change color when disabled
      state.isDisabled ? "#999" : "#f5f6fa",
    opacity: state.isDisabled ? "0.2" : "1",
    border: "none",
    margin: "5px 1.5% 0px 0%",
    height: "2.3rem",
    outline: "none",
    width: "12%",
    cursor: "pointer",
  }),

  placeholder: () => ({
    display: "none",
  }),
  clearIndicator: (base) => ({
    ...base,
    display: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    "&:hover": {
      backgroundColor: "rgb(252, 187, 8)",
    },
    backgroundColor: state.isSelected ? "rgb(252, 187, 8)" : "white",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: "999",
    width: "12%",
  }),
  valueContainer: (provided) => ({
    ...provided,
    position: "absolute",
  }),
};

export const customSearch = {
  control: () => ({
    margin: "0 10px",
    borderRadius: "9px",
    padding: "0 20px 0 0px",
    border: "1px solid rgba(0, 0, 0, 0.192)",
  }),

  placeholder: () => ({
    marginTop: "-30px",
    color: "#6666",
  }),

  //  option color on hover green
  option: (provided, state) => ({
    ...provided,
    "&:hover": {
      backgroundColor: `var(--primary-color)`,
    },
    backgroundColor: state.isSelected ? `var(--primary-color)` : "white",
  }),

  // dropdown width
  menu: (provided) => ({
    ...provided,
    width: "96%",
    marginLeft: "0.6rem",
  }),
};

// add new user
export const addNewUser = {
  backgroundColor: `var(--primary-color)`,
  color: "white",
  borderRadius: "5px",
  padding: "10px 20px",
  height: "2.3rem",
  minWidth: "9rem",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  textWrap:"nowrap"

};

export const customButtonStyle = {
  backgroundColor: `var(--primary-color)`,
  color: "white",
  borderRadius: "5px",
  padding: "10px 20px",
  minWidth: "7rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  textWrap:"nowrap"
};
export const customButtonStyle1 = {
  backgroundColor: `var(--white)`,
  color: `var(--primary-color)`,
  borderRadius: "5px",
  padding: "10px 20px",
  minWidth: "7rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: `1px solid var(--primary-color)`,
  textWrap:"nowrap"

};

export const inputStyle = {
  background: `rgba(231, 231, 231, 1)`,
  borderRadius: "8px",
};
