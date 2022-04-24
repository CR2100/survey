import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  var username = localStorage.getItem("currUser");
  var isLoggedIn = false;
  if(username.length != 0){
     isLoggedIn = true;
     console.log(isLoggedIn)
  }
  function logout(){
  localStorage.setItem("currUser", "");
  console.log("click")
  isLoggedIn = false;
  window.location.href = '/'
  }
  return (
    <div className="navbar">
      <Link to="/">Intro</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/createSurvey">Create Survey</Link>
      <Link to="/mySurveys">My Surveys</Link>
      <Link to="/stats">Stats</Link>
      {isLoggedIn ? (
        <a onClick={logout}>Log Out</a>
      ) : (
      <h1></h1>
      )}
    </div>
  );
}
