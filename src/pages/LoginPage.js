import React, {useState} from 'react'
import axios from 'axios';
export default function LoginPage() {
    
    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    
    const register = () => {
        //send username and password to backend db
       // console.log(usernameReg)
      console.log(usernameReg, passwordReg)
      axios.post('http://localhost:3001/loginPage',
      {
          username: usernameReg,
          password: passwordReg,
          mode: "cors"
      }
      ,{}
      ).then((response) => {
        console.log(response)
      }).catch(error => {
        if (!error.response) {
            // network error
            this.errorStatus = 'Error: Network Error';
        } else {
            this.errorStatus = error.response.data.message;
        }
      })
      
      
    }
    
    return (
        <div>
        <div className="create">
            <h2>Register</h2>
            <label></label>
            <input type ="text" placeholder="Username..."
            onChange={(e)=> {
                setUsernameReg(e.target.value)
                }}
            />
            <label></label>
            <input type="text"  placeholder="Password..."
            onChange={(e)=> {
                setPasswordReg(e.target.value)
                }}
            />
            <button onClick= {register}>Register</button>
        </div>
        <div className="create">
            <h2>Login</h2>
            <input type ="text" placeholder="Username..."/>
            <input type="password" placeholder="Password..."/>
            <button>Login</button>
        </div>
        </div>
    )
}