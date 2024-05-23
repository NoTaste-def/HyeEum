import React, { useEffect, useRef, useState } from "react";
import style from "./Setting.module.css";
import { useNavigate } from "react-router-dom";
import { Toggle } from "./Toggle";
import { useSelector } from "react-redux";
import axios from "axios";
import store from "../store";
import { Player } from "@lordicon/react";

let a = null;
const FORMAT = "YYYY-MM-DD";
const SUBMIT = require("../assets/submit.json");
const CANCEL = require("../assets/cancel.json");
const HOME = require("../assets/home.json");

const Setting = () => {
  let [birth, setBirth] = useState("");
  let [payload, setPayload] = useState({
    user_name: "",
    birth: "",
  });

  const user = useSelector((state) => {
    return state.user;
  });
  const polite = useSelector((state) => {
    return state.toggleState;
  });

  const navigate = useNavigate();

  const cancelRef = useRef(null);
  const submitRef = useRef(null);
  const homeRef = useRef(null);

  const handleSubmit = () => {
    submitRef.current.playFromBeginning();
  };
  const handleCancel = () => {
    cancelRef.current.playFromBeginning();
  };
  const handleHome = () => {
    homeRef.current.playFromBeginning();
  };

  const toMain = () => {
    navigate("/main");
  };

  const getSeperator = () => {
    const regex = /[^0-9a-zA-Z]+/;
    const match = FORMAT.match(regex);
    // match => ['-', index: 4, input: YYYY-MM-DD, groups: undefined]
    // 따라서 match[0] = '-'

    if (match) {
      const symbol = match[0]; // symbol = '-'
      const indexes = [];

      for (let i = 0; i < FORMAT.length; i++) {
        if (FORMAT[i] === symbol) {
          indexes.push(i);
        }
      }

      return { symbol, indexes };
    } else {
      return { symbol: undefined, indexes: [] };
    }
  };

  const seperator = getSeperator();

  const handleChangeDate = (e) => {
    let cur = e.target.value;

    if (cur.length === 4 && birth.length < cur.length) {
      cur = cur + seperator.symbol;
    } else if (cur.length === 7 && birth.length < cur.length) {
      cur = cur + seperator.symbol;
    }

    // if (seperator.symbol && seperator.indexes.length > 0) {
    //   seperator.indexes.forEach((index) => {
    //     if (cur.length > index) {
    //       cur = cur.slice(0, index) + seperator.symbol + cur.slice(index);
    //     }
    //   });
    // }

    setBirth(cur);
  };

  useEffect(() => {
    let copy = { ...payload };
    copy.polite = polite.polite;
    setPayload(copy);
  }, [polite]);

  useEffect(() => {
    submitRef.current?.play();
    cancelRef.current?.play();
    homeRef.current?.play();

    return clearTimeout(a);
  }, []);

  return (
    <div className={style.mainWrapper}>
      <nav className={style.mainNav}>
        <header>HyeEum</header>
        <button
          onClick={() => {
            handleHome();
            a = setTimeout(() => {
              toMain();
            }, 1080);
          }}
        >
          <Player
            size={30}
            colorize="rgb(200, 195, 123)"
            ref={homeRef}
            icon={HOME}
            onComplete={() => {
              cancelRef.current?.goToFirstFrame();
            }}
            state="morph-home-2"
          />
        </button>
      </nav>
      <main className={style.mainCon}>
        <article className={style.settingCon}>
          <section className={style.birthWrap}>
            <label htmlFor="birth">생일 수정</label>
            <input
              className={style.input}
              id="birth"
              value={birth}
              maxLength={10}
              onChange={handleChangeDate}
              placeholder="YYYY-MM-DD"
            />
          </section>

          <section className={style.nickWrap}>
            <label htmlFor="nick">닉네임 수정</label>
            <input
              className={style.input}
              id="nick"
              placeholder={user.user_name}
              onChange={(e) => {
                let copy = { ...payload };
                copy.user_name = e.target.value;
                setPayload(copy);
              }}
            />
          </section>
          <section className={style.toggleWrap}>
            <Toggle />
          </section>
        </article>
      </main>
      <footer className={style.btnCon}>
        <button
          onClick={() => {
            handleCancel();
            a = setTimeout(() => {
              toMain();
            }, 1080);
          }}
        >
          <Player
            colorize="rgb(170, 0, 0)"
            ref={cancelRef}
            size={50}
            icon={CANCEL}
            onComplete={() => {
              cancelRef.current?.goToFirstFrame();
            }}
            state="hover-cross-3"
          />
        </button>
        <button
          onClick={() => {
            // 클릭시 애니메이션 실행
            handleSubmit();

            // birth 값을 payload에 싣는 과정.
            let copy = { ...payload };
            copy.birth = birth;
            setPayload(copy);

            // patch 요청.
            // axios
            //   .patch("http://[IP Address]/users/[User Tag]", payload)
            //   .then((res) => {
            //     console.log(res.data);
            //   })
            //   .catch(() => {
            //     alert("Failed to PATCH");
            //   });
            console.log(payload);
          }}
        >
          <Player
            colorize="rgb(0, 170, 0)"
            ref={submitRef}
            size={50}
            icon={SUBMIT}
            state="morph-check-in-1"
          />
        </button>
      </footer>
    </div>
  );
};

export default Setting;
