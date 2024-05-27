import React, { useEffect, useRef, useState } from "react";
import style from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { Player } from "@lordicon/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

let a = null;
const URL =
  "https://port-0-hyeeum-backend-9zxht12blqj9n2fu.sel4.cloudtype.app/";

const BOOK = require("../assets/book.json");
const CHART = require("../assets/chart.json");
const GEAR = require("../assets/gear.json");

const Main = () => {
  const navigate = useNavigate();
  // const [arr, setArr] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [books, setBooks] = useState(null);
  const [user, setUser] = useState(null);
  const [lib, setLib] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  // const [tag, setTag] = useState(null);

  const dispatch = useDispatch();
  const bookDelay = useSelector((state) => {
    return state.bookDelay.isDelay;
  });

  const bookRef = useRef(null);
  const chartRef = useRef(null);
  const gearRef = useRef(null);

  const handleSetting = () => {
    gearRef.current.playFromBeginning();
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("local_user"));
    const storedLib = JSON.parse(localStorage.getItem("library"));
    if (storedLib && storedLib.length > 0) {
      setBooks(storedLib[0].books);
    }
    setUser(storedUser);
    setLib(storedLib);
  }, []);

  useEffect(() => {
    if (user) {
      axios.get(`${URL}users/${user.id}`).then((res) => {
        console.log(res.data);
      });
    }
  }, [user]);

  useEffect(() => {
    // Library 전체 조회
    if (user && user.user_tag) {
      axios
        .get(`${URL}library`, { params: { user_tag: user.user_tag } })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("library", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error("Err", err);
        });
    }
  }, [user]);

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
    // console.log(lib);
    navigate(`/static/${lib[0].id}`);
  };
  const toDiary = () => {
    navigate(`/diary`);
  };
  return (
    <div className={style.mainWrapper}>
      <nav className={style.mainNav}>
        <header
        // onClick={() => {
        //   axios.delete(`${URL}users/${user.id}`).catch(() => {
        //     console.log("DELETE Failed");
        //   });
        // }}
        >
          HyeEum
        </header>
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
          {books
            ? books.map((a, i) => {
                // console.log(typeof books[i].created_at); => 받은 값은 string임. Date객체 X
                let date = new Date(books[i].created_at);

                let formatted =
                  date.getFullYear() +
                  "년 " +
                  parseInt(date.getMonth() + 1) +
                  "월 " +
                  date.getDate() +
                  "일";
                return (
                  <figure
                    key={i}
                    className={style.slide}
                    onClick={() => {
                      // 여기에 모달창 뜨는 이벤트
                      openModal();
                      setClickedIndex(i);
                    }}
                  >
                    <img src={books[i].image} />
                    <br />
                    <p>{formatted}</p>
                    <p>{books[i].emotion}</p>
                  </figure>
                );
              })
            : // <figure className={style.slide}>책이 배송중이예요</figure>
              null}
          {/* {bookDelay ? (
            <figure className={style.slide}>책이 배송중이예요</figure>
          ) : books ? (
            books.map((a, i) => {
              // console.log(typeof books[i].created_at); => 받은 값은 string임. Date객체 X
              let date = new Date(books[i].created_at);

              let formatted =
                date.getFullYear() +
                "년 " +
                parseInt(date.getMonth() + 1) +
                "월 " +
                date.getDate() +
                "일";
              return (
                <figure
                  key={i}
                  className={style.slide}
                  onClick={() => {
                    // 여기에 모달창 뜨는 이벤트
                    openModal();
                    setClickedIndex(i);
                  }}
                >
                  <img src={books[i].image} />
                  <br />
                  <p>{formatted}</p>
                  <p>{books[i].emotion}</p>
                </figure>
              );
            })
          ) : (
            <figure className={style.slide}>책이 배송중이예요</figure>
          )} */}
        </article>
      </main>
      {isOpen ? (
        <Modal
          className={style.modal}
          isOpen={isOpen}
          closeModal={closeModal}
          index={clickedIndex}
          books={books}
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
          {/* 일기버튼 
          이거 눌렀을 때, 오늘 일기 작성 이력 있으면 못가게 이동 막고 Alert창 띄우기*/}
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
