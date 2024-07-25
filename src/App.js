import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toggle } from "./component/Toggle";
const Main = lazy(() => import("./component/Main"));
const Diary = lazy(() => import("./component/Diary"));
const Setting = lazy(() => import("./component/Setting"));
const Input = lazy(() => import("./component/Input"));
const Firstload = lazy(() => import("./component/Firstload"));
const Statistic = lazy(() => import("./component/Statistic"));
const LoadModal = lazy(() => import("./component/LoadModal"));
const NickConfirmModal = lazy(() => import("./component/NickConfirmModal"));
const DiaryModal = lazy(() => import("./component/DiaryModal"));

function App() {
  return (
    <Suspense fallback={<LoadModal msg={"로딩 중이에요"} />}>
      <Routes>
        {/* <Route path="/modal" element={<NickConfirmModal />} /> */}
        <Route path="/loader" element={<LoadModal />} />
        {/* <Route path="/img" element={<DiaryModal />} /> */}
        <Route path="/" element={<Firstload />} />
        <Route path="/input" element={<Input />} />
        <Route path="/static/:id" element={<Statistic />} />
        <Route path="/main" element={<Main />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/setting" element={<Setting />} />
        {/* <Route path="/to" element={<Toggle />} /> */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Suspense>
  );
}

export default App;
