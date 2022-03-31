import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from './pages/Intro';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CreateSurvey from './pages/CreateSurvey';
import MySurveys from './pages/MySurveys';
import Stats from './pages/Stats';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createSurvey" element={<CreateSurvey />} />
          <Route path="/mySurveys" element={<MySurveys />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
