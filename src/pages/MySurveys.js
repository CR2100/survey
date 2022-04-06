import React from 'react'
import { useState, useEffect } from 'react'

export default function MySurveys({currUser}) {

    // mySurveys will hold an array of surveys returned from the API call to the database
    const [mySurveys, setMySurveys] = useState([])

    useEffect(() => {
        // Pass appropriate info into getMySurveys
        const getMySurveys = async() => {
            // Call API to get all surveys for a given user

            // store them in mySurveys variable

        }

        getMySurveys()
    }, [])

    return (
        <div className="MySurveys">My Surveys
            <div className="DisplaySurveys">
                {/* Map through the mySurveys variable and print out each survey */}
            </div>
        </div>
    )
}