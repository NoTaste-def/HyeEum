import { useEffect, useState } from "react";
import style from "./Toggle.module.css";
import { useDispatch } from "react-redux";
import { SetIsOn } from "../store";

// https://velog.io/@fejigu/React-Toggle-Component-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0

export const Toggle = () => {
  const [isOn, setIsOn] = useState(true);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(SetIsOn(isOn));
  }, [isOn]);

  const toggleHandler = () => {
    setIsOn(!isOn);
  };

  return (
    <div className={style.flex}>
      <div
        className={`${style.toggleContainer} ${
          isOn ? style.toggleChecked : ""
        }`}
        onClick={toggleHandler}
      >
        <div className={style.content}>
          <span>경어</span>
          <span>평어</span>
        </div>
        <div
          className={`${style.toggleCircle} ${isOn ? style.toggleChecked : ""}`}
        />
      </div>
    </div>
  );
};
