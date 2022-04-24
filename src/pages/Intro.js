import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

export default function Intro() {
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   event.target.reset();
  // }

  const login = () => {
    if(usernameLog.length == 0 || passwordLog.length == 0){
      swal("Login Unuccessful :(", "Username/Password cannot be blank", "warning");
    }
    else{
    axios
      .post(
        "http://localhost:3001/login",
        {
          username: usernameLog,
          password: passwordLog,
        },
        {}
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          //setSubmitted(true);
          swal(
            "Login Successful!",
            "Welcome back " + usernameLog + "!",
            "success"
          );
          localStorage.setItem("currUser", usernameLog);
          window.location.href = '/mySurveys'
        }
        if (response.status === 201) {
          swal("Login Unuccessful :(", "Incorrect password!", "error");
        }
        if (response.status === 202) {
          swal("Login Unuccessful :(", "User does not exist", "warning");
        }
      })
      .catch((error) => {
        if (!error.response) {
          // network error
          this.errorStatus = "Error: Network Error";
        } else {
          this.errorStatus = error.response.data.message;
        }
      });
    }
  };

  return (
    <div className="create">
      <h1>Welcome to Survey Maker</h1>
      <h2>Brought to you by Lori, Daniel, Colby, and Payne</h2>
      <div>
        <nav>
          <Link to="/SignUp">Don't have an account? Sign up!</Link>
        </nav>
      </div>
      <div className="create">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => {
            setUsernameLog(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setPasswordLog(e.target.value);
          }}
        />
        <button class="pushable" onClick={login}>
          <span class="front bigButton">Login</span>
        </button>
      </div>
    </div>
  );
}
