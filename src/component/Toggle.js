import { useEffect, useState } from "react";
import styles from "./Toggle.module.css";
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
    <div className={styles.flex}>
      <div
        className={`${styles.toggleContainer} ${
          isOn ? styles.toggleChecked : ""
        }`}
        onClick={toggleHandler}
      >
        <div
          className={`${styles.toggleCircle} ${
            isOn ? styles.toggleChecked : ""
          }`}
        />
      </div>
    </div>
  );
};
