import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./component/Main";
import Load from "./component/Load";
import Chat from "./component/Chat";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Load />} />
        <Route path="/main" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
