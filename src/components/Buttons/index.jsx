import React from "react";
import style from "./buttons.module.css";
import { customButtonStyle,customButtonStyle1 } from "../Style/Style";
import { CiEdit } from "react-icons/ci";
const CommonButton = ({ label, onClick, type, styles }) => {
  switch (type) {
    case "submit":
      return <button
      className="common-button"
      style={{...customButtonStyle,...styles}}
      onClick={onClick}
    >
      <span className={style.btnLabel}>{label}</span>
    </button>
    case "cancel":
      return <button
      className="common-button"
      style={{...customButtonStyle1,...styles}}
      onClick={onClick}
    >
      <span className={style.btnLabel}>{label}</span>
    </button>
     case "editPolygon":
      return <button
      className="common-button"
      style={{...customButtonStyle,...styles}}
      onClick={onClick}
    >
      <div><CiEdit style={{color:"#fff",fontSize:"1.35rem"}}/>&nbsp; <span className={style.btnLabel}>{label}</span></div>
    </button>
    default:
      return <button
      type={type}
      className="common-button"
      style={styles}
      onClick={onClick}
    >
      <span className={style.btnLabel}>{label}</span>
    </button>
  }
 
};

export default CommonButton;
