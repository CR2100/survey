import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from './pages/Intro';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CreateSurvey from './pages/CreateSurvey';
import MySurveys from './pages/MySurveys';
import Stats from './pages/Stats';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
function App() {
  const [currUser, setCurrUser] = useState({});
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createSurvey" element={<CreateSurvey />} />
          <Route path="/mySurveys" element={<MySurveys currUser={currUser} />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/loginPage" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
