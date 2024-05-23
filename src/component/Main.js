import React, { useEffect, useRef, useState } from "react";
import style from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { Player } from "@lordicon/react";

let a = null;
const BOOK = require("../assets/book.json");
const CHART = require("../assets/chart.json");
const GEAR = require("../assets/gear.json");

const Main = () => {
  const navigate = useNavigate();
  let [arr, setArr] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [isOpen, setIsOpen] = useState(false);

  const bookRef = useRef(null);
  const chartRef = useRef(null);
  const gearRef = useRef(null);

  const handleSetting = () => {
    gearRef.current.playFromBeginning();
  };

  useEffect(() => {
    bookRef.current.playFromBeginning();
    chartRef.current.playFromBeginning();
    gearRef.current.playFromBeginning();
  }, []);

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
    <div className={style.mainWrapper}>
      <nav className={style.mainNav}>
        <header>HyeEum</header>
        <button
          className={style.settingBtn}
          onClick={() => {
            handleSetting();
            a = setTimeout(() => {
              toSetting();
            }, 1080);
          }}
        >
          <Player
            ref={gearRef}
            size={30}
            colorize="rgb(200, 195, 123)"
            icon={GEAR}
            state="hover-cog-2"
          />
        </button>
      </nav>
      <main className={style.mainCon}>
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
      <footer className={style.mainBtnCon}>
        <button
          className={style.diary}
          onClick={() => {
            toDiary();
          }}
        >
          <Player
            ref={bookRef}
            size={50}
            colorize="rgb(200, 195, 123)"
            icon={BOOK}
          />
          {/* 일기버튼 */}
        </button>
        <button
          className={style.static}
          onClick={() => {
            toStatistic();
          }}
        >
          <Player
            ref={chartRef}
            size={50}
            icon={CHART}
            colorize="rgb(200, 195, 123)"
            className={style.chartBtn}
          />
          {/* 통계버튼 */}
        </button>
      </footer>
    </div>
  );
};

export default Main;
