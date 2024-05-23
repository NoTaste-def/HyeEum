import React from "react";
import style from "./LoadModal.module.css";
import lunar from "../assets/lunar.png";
import cloud from "../assets/cloud.png";

const LoadModal = () => {
  return (
    <div className={style.loader}>
      <div className={style.iconWrapper}>
        <img className={style.lunar} src={lunar} />
        <img className={style.cloud} src={cloud} />
      </div>
      <div className={style.msgWrapper}>
        <span className={style.message}>이름을 짓고 있어요</span>
      </div>
    </div>
  );
};

export default LoadModal;
