import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadModal from "./LoadModal";

import style from "./Diary.module.css";
import { useDispatch, useSelector } from "react-redux";
import DiaryModal from "./DiaryModal";
import { Navigate, useNavigate } from "react-router-dom";

const URL =
  "https://port-0-hyeeum-backend-9zxht12blqj9n2fu.sel4.cloudtype.app/";
const MSG = "그림을 그리고 있어요";
let a = null; // 타이머로 쓸 변수

const Diary = () => {
  const [polite, setPolite] = useState("");
  const [query, setQuery] = useState([]);
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [libraryId, setLibraryId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("오늘은 어떤 일이 있었나요?");
  const [res, setRes] = useState();
  const [pending, setPending] = useState(null);

  const user = useSelector((state) => {
    return state.user;
  });

  const handleAddDialogue = () => {
    let copy = [...query];
    copy.push("Q: " + question);
    copy.push("A: " + input);
    setQuery(copy);
    setInput("");
    setPending(copy);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("local_user"));
    if (storedUser.polite === true) {
      setPolite("경어");
    } else {
      setPolite("평어");
    }
  }, []);

  useEffect(() => {
    // query 상태가 완전히 업데이트 된 이후 post 실행.
    // 이거 이렇게 안하면 query 상태 업데이트 전에 보내져서 원하는 결과 안나옴.
    console.log(polite);
    if (pending) {
      axios
        .post(`${URL}question-generation`, {
          qna_string: query.join("\n"),
          alignment: user.alignment,
          polite: polite,
        })
        .then((res) => {
          console.log(res.data);
          setRes(res.data);
        })
        .catch(() => {
          console.error("Error generating question:");
        });
    }
  }, [pending, user.alignment]);

  useEffect(() => {
    // res 상태 업데이트 된 이후 접근해서 substr 작업 수행( 앞부분 'Q: ' 이거 떼는 작업)
    // 서버 업데이트 이후로 substr 미수행.
    if (res && res.question) {
      setQuestion(res.question.replace(". ", ".\n"));
    }
  }, [res]);

  const handleGenerateImage = async () => {
    setIsLoading(true);

    try {
      const emoRes = await axios.post(`${URL}emotion-generation`, {
        qna_string: query.join("\n"),
        alignment: user.alignment,
        polite: polite,
      });

      console.log(emoRes.data);

      const imgRes = await axios.post(`${URL}image-generation`, {
        qna_string: query.join("\n"),
        emotion: emoRes.data.emotion,
      });

      console.log(imgRes);
      setImageUrl(imgRes.data.image_url);
      setRes(emoRes.data); // 필요 시 res 업데이트
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false);
    }

    // await axios
    //   .post(`${address}emotion-generation`, {
    //     qna_string: query.join("\n"),
    //     alignment: user.alignment,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     setRes(res.data);
    //   });

    // if (res.emotion) {
    //   axios
    //     .post(`${address}image-generation`, {
    //       qna_string: query.join("\n"),
    //       emotion: res.emotion,
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       setImageUrl(res.data.image_url);
    //     })
    //     .catch(() => {
    //       console.error("Error generating image:");
    //     });
    //   setIsLoading(false);
    // }

    // const emotionRegex = /emotion:\s*([^]+)/;
    // const matches = emotionRegex.exec(res.Q);
    // const emotionPart = matches ? matches[1] : null;
    // setEmotion(emotionPart);
    // console.log(emotionPart);
  };

  return (
    <div className={style.wrapper}>
      <section className={style.talk_q_container}>
        {question ? (
          <div className={style.generated_question}>
            <p>{question}</p>
          </div>
        ) : null}
      </section>

      <form
        className={style.inputCon}
        onSubmit={(e) => {
          e.preventDefault();
          handleAddDialogue();
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <section className={style.paintCon}>
        <button onClick={handleGenerateImage}>그림 그리기</button>
      </section>
      <section className={style.answerCon}>
        <ol>
          {query.map((q, index) => (
            <li key={index}>{q}</li>
          ))}
        </ol>
        <div className={style.answerConBg} />
      </section>

      {isLoading && <LoadModal msg={MSG} />}

      {!isLoading && imageUrl && res.consolation && (
        <DiaryModal url={imageUrl} detailStory={query.join("\n")} res={res} />
      )}
    </div>
  );
};

export default Diary;
