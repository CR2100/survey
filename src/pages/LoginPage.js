import React, {useState} from 'react'

export default function LoginPage() {
    
    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    
    const register = () => {
        //send username and password to backend db
      console.log(usernameReg, passwordReg)
    }
    
    return (
        <div>
        <div className="create">
            <h2>Register</h2>
            <label>Username</label>
            <input type ="text" 
            onChange={(e)=> {
                setUsernameReg(e.target.value)
                }}
            />
            <label>Password</label>
            <input type="text" 
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