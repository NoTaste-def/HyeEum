import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./component/Main";
import Load from "./component/Load";
import Chat from "./component/Chat";
import Setting from "./component/Setting";
import Input from "./component/Input";
import { Toggle } from "./component/Toggle";

function App() {
  return (
    <>
      <Routes>
        <Route path="/load" element={<Load />} />
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/input" element={<Input />} />
        <Route path="/to" element={<Toggle />} />
      </Routes>
    </>
  );
}

export default App;
