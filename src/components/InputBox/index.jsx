import React from "react";
import style from "./InputBox.module.css";
import { ImAttachment } from "react-icons/im";

export const InputBox = ({
  type,
  value,
  onChange,
  errMsg,
  placeholder,
  styles,
  onKeyDown,
  onKeyPress,
}) => {
  return (
    <>
      <input
        className={style.input_box}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={styles}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
      />
      {errMsg && <p className={`errorMsg`}>{errMsg}</p>}
    </>
  );
};

export const InputFileBox = ({
  fileRef,
  value,
  onChange,
  errMsg,
  accept,
  placeholder,
}) => {
  return (
    <>
      <div
        className={style.kmlFile_input_div}
        onClick={() => fileRef.current.click()}
      >
        <ImAttachment className={style.attach_file_icon} />
        {value ? (
          value?.name ? (
            <p className={style.kml_file_name_para}>{value?.name}</p>
          ) : (
            <p className={style.kml_file_name_para}>{value}</p>
          )
        ) : (
          <p className={style.attach_file_para}>{placeholder}</p>
        )}

        <input
          className={style.input_file}
          type="file"
          id="FileTag"
          ref={fileRef}
          accept={accept}
          onChange={onChange}
        />
      </div>
      {errMsg && <p className={`errorMsg`}>{errMsg}</p>}
    </>
  );
};

export const CustomTextArea = ({
  value,
  onChange,
  errMsg,
  placeholder,
  styles,
  onKeyDown,
  onKeyPress,
}) => {
  return (
    <>
      <textarea
        className={style.text_area}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={styles}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
      />
      {errMsg && <p className={`errorMsg`}>{errMsg}</p>}
    </>
  );
};  
