import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
export default function LoginPage() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const successReg = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User {usernameReg} successfully registered</h1>
      </div>
    );
  };

  const register = () => {
    console.log(usernameReg, passwordReg);
    axios
      .post(
        "http://localhost:3001/register",
        {
          username: usernameReg,
          password: passwordReg,
        },
        {}
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("lets go");
          //setSubmitted(true);
          swal(
            "Registration Successful!",
            "Welcome " + usernameReg + "!",
            "success"
          );
        }
        if (response.status === 201) {
          swal(
            "Registration Unsuccessful!",
            "username " + usernameReg + " already exists!",
            "error"
          );
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
  };
  const login = () => {
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
          console.log(localStorage.getItem("currUser"));
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
  };
  return (
    <div>
      {/* Calling to the methods */}
      <div className="messages">{successReg()}</div>
      <div className="create">
        <h2>Register</h2>
        <label></label>
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label></label>
        <input
          type="text"
          placeholder="Password..."
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button class="pushable " onClick={register}>
          <span class="front bigButton">Register</span>
        </button>
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
