import React, { useEffect, useState } from "react";
import style from "./NickConfirmModal.module.css";
import { useNavigate } from "react-router-dom";

const NickConfirmModal = ({ res }) => {
  const [nick, setNick] = useState(res.nickname[3]);
  const [birth, setBirth] = useState(null);
  const [cnt, setCnt] = useState(0);

  let navigate = useNavigate();
  const toMain = () => {
    navigate("/main");
  };

  return (
    <>
      {cnt === 0 ? (
        <div className={style.nickCon}>
          <div className={style.background}></div>
          <div className={style.wrapper}>
            <span className={style.nickname}>[ {res.nickname[3]} ]</span>
            <span>
              이 닉네임이 마음에 드시나요?
              <br />
              아니라면 직접 지어주세요.
            </span>
            <input
              className={style.renameInput}
              onChange={(e) => {
                setNick(e.target.value);
              }}
            />
            <button
              className={style.toNextBtn}
              onClick={() => {
                setCnt(cnt + 1);
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
              placeholder="YYYY-MM-DD"
              className={style.renameInput}
              onChange={(e) => {
                setBirth(e.target.value);
              }}
            />
            <button
              className={style.toNextBtn}
              onClick={() => {
                if (!birth) {
                  alert("생일을 입력해주세요!");
                } else {
                  toMain();
                }
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
