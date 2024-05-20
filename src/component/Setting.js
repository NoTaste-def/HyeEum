import React, { useEffect, useState } from "react";
import style from "./Setting.module.css";
import { useNavigate } from "react-router-dom";
import { Toggle } from "./Toggle";
import { useSelector } from "react-redux";
import axios from "axios";
import store from "../store";

const Setting = () => {
  let [payload, setPayload] = useState({
    user_name: "",
    birth: "",
  });

  const polite = useSelector((state) => {
    return state.toggleState;
  });

  const navigate = useNavigate();
  const toMain = () => {
    navigate("/main");
  };

  useEffect(() => {
    payload = polite;
  }, [polite]);

  return (
    <div className={style.main_wrapper}>
      <nav className={style.main_nav}>
        <header>HyeEum</header>
        <button
          onClick={() => {
            toMain();
          }}
        >
          X
        </button>
      </nav>
      <main className={style.main_con}>
        <article>
          <section className={style.desc}>
            <label
              className={style.toggleLabel}
              style={{ position: "absolute", top: 0, left: "46%" }}
            >
              반말모드 on/off
            </label>
            <Toggle style={{ position: "absolute", top: 0, left: 0 }} />
          </section>

          <br />
          <input
            className={style.birthInput}
            id="birth"
            type="date"
            onChange={(e) => {
              let copy = { ...payload };
              copy.birth = e.target.value;
              setPayload(copy);
            }}
          />
          <label className={style.birthLabel} for="birth">
            생일 수정
          </label>
          <br />
          <input
            className={style.nickInput}
            id="nick"
            onChange={(e) => {
              let copy = { ...payload };
              copy.user_name = e.target.value;
              setPayload(copy);
            }}
          />
          <label className={style.nickLabel} for="nick">
            유저네임 수정
          </label>
        </article>
      </main>
      <section className={style.btnCon}>
        <button
          onClick={() => {
            toMain();
          }}
        >
          취소
        </button>
        <button
          onClick={() => {
            // 여기에 axios
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
          적용
        </button>
      </section>
    </div>
  );
};

export default Setting;
