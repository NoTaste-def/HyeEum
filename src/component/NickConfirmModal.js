import React, { useEffect, useState } from "react";
import style from "./NickConfirmModal.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAlign, updateBirth, updateName, updateToggle } from "../store";
import axios from "axios";

let a = null; // 타이머 담을 변수
const FORMAT = "YYYY-MM-DD";
const URL =
  "https://port-0-hyeeum-backend-9zxht12blqj9n2fu.sel4.cloudtype.app/";

const NickConfirmModal = ({ res }) => {
  const [nick, setNick] = useState(res.nickname[3]);
  // const [nick, setNick] = useState("hello");
  const [birth, setBirth] = useState("");
  const [cnt, setCnt] = useState(0);
  const [align, setAlign] = useState(res.alignment);

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const user = useSelector((state) => {
    return state.user;
  });

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

  const createUser = async () => {
    if (!user.birth && user.birth.length !== 10) {
      alert("이대로 진행하시겠습니까?");
      return;
    }

    const data = { ...user };

    try {
      const res = await axios.post(`${URL}users`, data);
      localStorage.setItem("local_user", JSON.stringify(res.data));
      toMain();
    } catch (error) {
      alert("POST Failed");
      console.log(data);
    }
  };

  return (
    <>
      {cnt === 0 ? (
        <div className={style.nickCon}>
          <div className={style.background}></div>
          <div className={style.wrapper}>
            <span className={style.nickname}>[ {res.nickname[3]} ]</span>
            {/* <span className={style.nickname}>[ {nick} ]</span> */}
            <span>
              이 닉네임이 마음에 드시나요?
              <br />
              아니라면 직접 지어주세요.
            </span>
            <input
              className={style.input}
              onChange={(e) => {
                setNick(e.target.value);
              }}
            />
            <button
              className={style.toNextBtn}
              onClick={() => {
                setCnt(cnt + 1);
                dispatch(updateName(nick));
                dispatch(updateAlign(align));
              }}
            >
              다음으로
            </button>
          </div>
        </div>
      ) : (
        <div className={style.birthCon}>
          <div className={style.background}></div>
          <div className={style.wrapper}>
            <span>당신의 생일도 물어볼게요!</span>
            <input
              maxLength={10}
              value={birth}
              placeholder={FORMAT}
              className={style.input}
              onChange={handleChangeDate}
            />
            <button
              className={style.toNextBtn}
              onClick={() => {
                dispatch(updateBirth(birth));
                createUser();
              }}
            >
              시작하기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NickConfirmModal;
