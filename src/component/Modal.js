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
          <nav>그 날의 기억...</nav>
          <main className={style.main}>
            <article className={style.modalImg}>
              <img
                src="https://blog.kakaocdn.net/dn/dpxiAT/btqUBv6Fvpn/E8xUMncq7AVuDeOim0LrMk/img.jpg"
                style={{ width: "200px", height: "200px" }}
              ></img>
            </article>
            <section className={style.modalScript}>
              Q: ㅇㄴㄹㅇㄴㅁㅁㅇ <br /> A: ㄹㄴㅁㄹㅇㄹㅇㄴ <br />
              Q: ㅇㄴㄹㅇㄴㅁㅁㅇ <br /> A: ㄹㄴㅁㄹㅇㄹㅇㄴ <br />
              Q: ㅇㄴㄹㅇㄴㅁㅁㅇ <br /> A: ㄹㄴㅁㄹㅇㄹㅇㄴ <br />
              Q: ㅇㄴㄹㅇㄴㅁㅁㅇ <br /> A: ㄹㄴㅁㄹㅇㄹㅇㄴ <br />
              Q: ㅇㄴㄹㅇㄴㅁㅁㅇ <br /> A: ㄹㄴㅁㄹㅇㄹㅇㄴ <br />
              Q: ㅇㄴㄹㅇㄴㅁㅁㅇ <br /> A: ㄹㄴㅁㄹㅇㄹㅇㄴ <br />
              Q: ㅇㄴㄹㅇㄴㅁㅁㅇ <br /> A: ㄹㄴㅁㄹㅇㄹㅇㄴ <br />
              Q: ㅇㄴㄹㅇㄴㅁㅁㅇ <br /> A: ㄹㄴㅁㄹㅇㄹㅇㄴ <br />
              Q: ㅇㄴㄹㅇㄴㅁㅁㅇ <br /> A: ㄹㄴㅁㄹㅇㄹㅇㄴ <br />
            </section>
          </main>
        </div>
        {/* <footer className={style.footer}>
          <button onClick={closeModal}>닫기</button>
        </footer> */}
      </>
    );
  }
};

export default Modal;
