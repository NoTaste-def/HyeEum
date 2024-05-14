import React, { useState } from "react";
import style from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const Main = () => {
  const navigate = useNavigate();
  let [arr, setArr] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const toSetting = () => {
    navigate(`/setting`);
  };
  const toStatistic = () => {
    navigate(`/static`);
  };
  const toDiary = () => {
    navigate(`/diary`);
  };
  return (
    <div className={style.main_wrapper}>
      <nav className={style.main_nav}>
        <header>HyeEum</header>
        <button
          onClick={() => {
            toSetting();
          }}
        >
          ?
        </button>
      </nav>
      <main className={style.main_con}>
        <article className={style.carousel}>
          {arr.map((a, i) => {
            return (
              <figure
                key={i}
                className={style.slide}
                onClick={() => {
                  // 여기에 모달창 뜨는 이벤트
                  openModal();
                }}
              >
                <img src="https://blog.kakaocdn.net/dn/dpxiAT/btqUBv6Fvpn/E8xUMncq7AVuDeOim0LrMk/img.jpg"></img>
                <br />
                <span>2000-00-0{i}</span>
              </figure>
            );
          })}
        </article>
      </main>
      {isOpen ? (
        <Modal
          className={style.modal}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      ) : null}
      <footer className={style.main_btn_con}>
        <button
          onClick={() => {
            toStatistic();
          }}
        >
          통계
        </button>
        <button
          onClick={() => {
            toDiary();
          }}
        >
          일기
        </button>
      </footer>
    </div>
  );
};

export default Main;
