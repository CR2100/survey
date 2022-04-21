import React from 'react'
import { Link } from 'react-router-dom'
export default function Intro() {
    return (
        <div className="create">
            <h1>Welcome to Survey Maker</h1>
            <h2>Brought to you by Lori, Daniel, Colby, and Payne</h2>
            <nav>
            <Link to="/createSurvey">Create Survey</Link>
            </nav>
            
        </div>
    )
}