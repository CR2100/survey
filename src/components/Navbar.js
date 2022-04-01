import React from 'react'
import { Link } from 'react-router-dom'

const linkStyle = {
    color: 'orange',
    padding: 10,
  };
export default function Navbar() {
    return (
        
        <div className="Navbar">
            <nav>
                <Link to="/" style={linkStyle}>Intro</Link>
                <Link to="/home" style={linkStyle}>Home</Link>
                <Link to="/profile" style={linkStyle}>Profile</Link>
                <Link to="/createSurvey" style={linkStyle}>Create Survey</Link>
                <Link to="/mySurveys" style={linkStyle}>My Surveys</Link>
                <Link to="/stats" style={linkStyle}>Stats</Link>
            </nav>
        </div>
    )
}