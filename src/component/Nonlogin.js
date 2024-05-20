import React from "react";

const Nonlogin = () => {
  const nonLoginPage = () => {
    window.location.href = "http://localhost:3000/main";
  };
  return <div onClick={nonLoginPage}>메인페이지</div>;
};

export default Nonlogin;
