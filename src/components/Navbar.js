import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">Intro</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/createSurvey">Create Survey</Link>
      <Link to="/mySurveys">My Surveys</Link>
      <Link to="/stats">Stats</Link>
    </div>
  );
}
