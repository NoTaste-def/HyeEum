import React, { useEffect, useState } from "react";
import style from "./Input.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NickConfirmModal from "./NickConfirmModal";
import Typewriter from "typewriter-effect";
import axios from "axios";
import LoadModal from "./LoadModal";

const URL =
  "https://port-0-hyeeum-backend-9zxht12blqj9n2fu.sel4.cloudtype.app/";
const LOAD = "...";

const Input = () => {
  const [query, setQuery] = useState([]);
  const [cnt, setCnt] = useState(0);
  const [rand, setRand] = useState([]);
  const [ans, setAns] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [res, setRes] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCnt(cnt + 1);
    PushQuery();
  };

  const PushQuery = () => {
    // query 배열에 질문, 답 리스트 저장.
    // 나중에 보낼때는 arr.join('\n') 으로 개행문자로 배열 모든 값 연결하여 문자열 리턴.
    let copy = [...query];
    copy.push("Q : " + qna[rand[cnt]]);
    copy.push("A : " + ans);
    setQuery(copy);
    setAns("");
  };

  let qna = useSelector((state) => {
    return state.qna;
  });

  useEffect(() => {
    // 첫 로드시 랜덤 숫자 배열 생성.
    let arr = Array.from({ length: 21 }, () => Math.floor(Math.random() * 21));
    const set = new Set(arr);
    arr = [...set].slice(0, 5);
    setRand(arr);
  }, []);

  useEffect(() => {
    if (cnt === 5) {
      // 질문 끝내고 닉네임 생성 POST 요청 보내기

      //Format에 맞추어 변형
      const payload = query.join("\n");

      setIsLoading(true);

      axios
        .post(`${URL}nickname`, { qna_string: payload })
        .then((res) => {
          console.log(res.data);
          setRes(res.data);
        })
        .catch(() => {
          console.log("POST FAILED");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [cnt]);

  return (
    <>
      <header className={style.interact}>
        <section>{rand ? qna[rand[cnt]] : null}</section>
      </header>
      <footer className={style.footer}>
        <div className={style.inputCon}>
          <form onSubmit={handleSubmit}>
            <input
              required
              className={style.input}
              value={ans}
              onChange={(e) => {
                // 입력 데이터 저장
                setAns(e.target.value);
              }}
            />
            <button className={style.button} type="submit">
              {">"}
            </button>
          </form>
        </div>
      </footer>
      <Modal isLoading={isLoading} res={res} />
      <button
        onClick={() => {
          console.log(rand);
          console.log(query);
        }}
      ></button>
    </>
  );
};

const Modal = ({ isLoading, res }) => {
  if (isLoading) {
    return <LoadModal />;
  } else if (res) {
    return <NickConfirmModal res={res} />;
  }
  return null;
};

export default Input;
