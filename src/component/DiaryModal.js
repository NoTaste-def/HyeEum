import React, { useState } from "react";
import style from "./DiaryModal.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadModal from "./LoadModal";
import { useDispatch } from "react-redux";
import { setIsDelay } from "../store";

const address =
  "https://port-0-hyeeum-backend-9zxht12blqj9n2fu.sel4.cloudtype.app/";
const MSG = "책을 엮고 있어요";

const DiaryModal = ({ url, detailStory, res }) => {
  let [cnt, setCnt] = useState(0);
  const [comment, setComment] = useState("");
  const [emo, setEmo] = useState(res.emotion);
  const [consolation, setConsolation] = useState(res.consolation);
  const [isLoading, setIsLoading] = useState(false);
  const [lib, setLib] = useState(JSON.parse(localStorage.getItem("library")));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let SCRIPT = consolation.replace(". ", ".\n");

  const handleSaveDiary = async () => {
    setIsLoading(true);

    console.log({
      library_id: lib[0].id,
      image: url,
      comment: comment,
      detail_story: detailStory,
      emotion: emo,
    });

    await axios
      .post(`${address}books`, {
        library_id: lib[0].id,
        image: url,
        comment: comment,
        detail_story: detailStory,
        emotion: emo,
      })
      .then(() => {
        console.log("Book 생성 완료.");
        setIsLoading(false);
        dispatch(setIsDelay(true));
        navigate("/main");
      })
      .catch((err) => {
        console.error("Error saving diary entry:", err);
      });
  };

  if (cnt === 0) {
    return (
      <>
        <div className={style.background} />
        <main className={style.wrapper}>
          <figure className={style.img}>
            <img src={url} />
          </figure>
          <article>
            <p>그림이 완성 됐어요!</p>
            <p>{SCRIPT}</p>
          </article>
          <section
            className={style.nextTap}
            onClick={() => {
              setCnt(cnt + 1);
            }}
          >
            다음으로.
          </section>
        </main>
      </>
    );
  } else if (cnt === 1) {
    return (
      <>
        <div className={style.background} />
        <main className={style.wrapper}>
          <form
            className={style.customCon}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <article className={style.label}>지금 이런 기분이신가요?</article>
            <article className={style.label}>아니라면 정해주세요</article>
            <input
              className={style.input}
              value={emo}
              placeholder={emo}
              onChange={(e) => setEmo(e.target.value)}
            />
          </form>
          <section
            className={style.nextTap}
            onClick={() => {
              setCnt(cnt + 1);
            }}
          >
            다음으로.
          </section>
        </main>
      </>
    );
  } else if (cnt === 2) {
    return (
      <>
        <div className={style.background} />
        <main className={style.wrapper}>
          <form
            className={style.customCon}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <article className={style.label}>
              일기에 대한 코멘트를 작성해 주세요
            </article>
            <input
              className={style.input}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </form>
          <div className={style.nextTap} onClick={handleSaveDiary}>
            이곳을 터치해 일기를 저장해요.
          </div>
        </main>
        {isLoading ? <LoadModal msg={MSG} /> : null}
      </>
    );
  }
};

export default DiaryModal;
