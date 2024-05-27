import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toggle } from "./component/Toggle";
import Main from "./component/Main";
import Diary from "./component/Diary";
import Setting from "./component/Setting";
import Input from "./component/Input";
import Firstload from "./component/Firstload";
import Statistic from "./component/Statistic";
import LoadModal from "./component/LoadModal";
import NickConfirmModal from "./component/NickConfirmModal";
import DiaryModal from "./component/DiaryModal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/modal" element={<NickConfirmModal />} />
        <Route path="/loader" element={<LoadModal />} />
        <Route path="/img" element={<DiaryModal />} />
        <Route path="/" element={<Firstload />} />
        <Route path="/input" element={<Input />} />
        <Route path="/static/:id" element={<Statistic />} />
        <Route path="/main" element={<Main />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/to" element={<Toggle />} />
      </Routes>
    </>
  );
}

export default App;
