import React, { useEffect } from "react";
import style from "./Modal.module.css";
import axios from "axios";

let URL = "http:// 주소";

const Modal = ({ isOpen, closeModal }) => {
  useEffect(() => {
    axios
      .get(URL + "/library/[id]", "")
      .then((res) => {
        console.log(res.date);
      })
      .catch(() => {
        console.log("Failed to GET");
      });
  });

  if (!isOpen) return;
  else {
    return (
      <>
        <div className={style.background} onClick={closeModal}></div>
        <div className={style.wrapper}>
          <main>내용 드감</main>
        </div>
        <footer className={style.footer}>
          <button onClick={closeModal}>닫기</button>
        </footer>
      </>
    );
  }
};

export default Modal;
