import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toggle } from "./component/Toggle";
import Main from "./component/Main";
import Chat from "./component/Chat";
import Setting from "./component/Setting";
import Input from "./component/Input";
import Firstload from "./component/Firstload";
import Statistic from "./component/Statistic";
import LoadModal from "./component/LoadModal";
import NickConfirmModal from "./component/NickConfirmModal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/modal" element={<NickConfirmModal />} />
        <Route path="/loader" element={<LoadModal />} />
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
