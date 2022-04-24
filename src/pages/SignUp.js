import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
export default function SignUpPage() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [emailReg, setEmailReg] = useState(""); 
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

  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
  }

  const register = () => {
    console.log(usernameReg, passwordReg);
    axios
      .post(
        "http://localhost:3001/register",
        {
          username: usernameReg,
          password: passwordReg,
        //   email: emailReg
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
          window.location.href = '/'
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

  return (
    <form onSubmit = {handleSubmit}>
      {/* Calling to the methods */}
      <div className="messages">{successReg()}</div>
      <div className="create">
        <h2>Register</h2>
        <label></label>
        <input id = "username"
          type="text"
          placeholder="Username..."
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label></label>
        <input id = "password"
          type="text"
          placeholder="Password..."
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <input id = "email"
            type="text"
            placeholder="email..."
            onChange={(e) => {
                setEmailReg(e.target.value);
            }}
        />
        <button class="pushable " onClick={register}>
          <span class="front bigButton">Register</span>
        </button>
      </div>
      </form>
  );
}
