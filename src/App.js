import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components for different views/pages
import Main from './component/main/main'
import Nonlogin from './component/nonlogin/nonlogin'
import Statistics from './component/statistics/statistics';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Nonlogin" element={<Nonlogin />} />
          <Route path="/Statistics" element={<Statistics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
