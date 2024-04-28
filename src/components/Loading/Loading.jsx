import React from "react";
import style from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={style.Loading_container}>
      <div className={style.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
