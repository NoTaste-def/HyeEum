import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toggle } from "./component/Toggle";
import Main from "./component/Main";
import Chat from "./component/Chat";
import Setting from "./component/Setting";
import Input from "./component/Input";
import Firstload from "./component/Firstload";
import Nonlogin from "./component/Nonlogin";
import Statistic from "./component/Statistic";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Firstload />} />
        <Route path="/input" element={<Input />} />
        <Route path="/static" element={<Statistic />} />
        <Route path="/main" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/to" element={<Toggle />} />
      </Routes>
    </>
  );
}

export default App;
