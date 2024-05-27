import React, { useEffect, useState } from "react";
import style from "./Modal.module.css";
import axios from "axios";

let URL = "https://port-0-hyeeum-backend-9zxht12blqj9n2fu.sel4.cloudtype.app/";

const Modal = ({ isOpen, closeModal, index, books }) => {
  const [target, setTarget] = useState();

  useEffect(() => {
    axios
      .get(`${URL}books/${books[index].id}`, "")
      .then((res) => {
        // console.log(res.data);
        setTarget(res.data);
      })
      .catch(() => {
        console.log("Failed to GET");
      });
  }, []);

  if (!isOpen) return;
  else {
    return (
      <>
        <div className={style.background} onClick={closeModal}></div>
        {target ? (
          <div className={style.wrapper}>
            <nav>그 날의 기억.</nav>
            <main className={style.main}>
              <article className={style.modalImg}>
                <img
                  src={target.image}
                  style={{ width: "200px", height: "200px" }}
                />
              </article>
              <section className={style.detailStory}>
                <span className={style.label}>그 날의 대화</span>
                <div>{target.detail_story}</div>
              </section>
              <section className={style.comment}>
                <span className={style.label}>나의 코멘트</span>
                <div>{target.comment}</div>
              </section>
            </main>
            <footer className={style.footer}>배경을 눌러 닫기</footer>
          </div>
        ) : null}
      </>
    );
  }
};

export default Modal;
