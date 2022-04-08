import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar() {
    return (
        
        <div className="navbar">
            <nav>
                <Link to="/" >Intro</Link>
                <Link to="/home" >Home</Link>
                <Link to="/profile" >Profile</Link>
                <Link to="/createSurvey" >Create Survey</Link>
                <Link to="/mySurveys">My Surveys</Link>
                <Link to="/stats">Stats</Link>
                <Link to="/loginPage">Login/Sign up</Link>
            </nav>
        </div>
    )
}