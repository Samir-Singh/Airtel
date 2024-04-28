import React from "react";
import style from "./inputs.module.css";

const CommonInput = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  styles,
  placeholders,
  errMsg,
  onKeyDown,
  onKeyPress,
  icon,
  labelShow = true,
}) => {
  return (
    <div className={style.form_group} style={styles}>
      {labelShow && (
        <label htmlFor={name} className={style.inputLabel}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={style.inputBox}
        onBlur={onBlur}
        autoComplete="off"
        placeholder={placeholders}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
      />
      {errMsg && <p className={style.errMsg}>{errMsg}</p>}
      {icon}
    </div>
  );
};

export default CommonInput;

export const CommonFileInput = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  styles,
  placeholders,
}) => {
  return (
    <div className={style.form_group} style={styles}>
      <label htmlFor={name} className={style.inputLabel}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={style.inputfileBox}
        onBlur={onBlur}
        accept=".kml"
        autoComplete="off"
        placeholder={placeholders}
        data-text="Attach Circle File"
      />
    </div>
  );
};
