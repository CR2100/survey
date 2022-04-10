import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function MySurveys({currUser}) {

    // mySurveys will hold an array of surveys returned from the API call to the database
    const [mySurveys, setMySurveys] = useState({})

    useEffect(() => {
        // Pass appropriate info into getMySurveys
         function getMySurveys(){
            // Call API to get all surveys for a given user
         var user = localStorage.getItem("currUser");
           axios.get("http://localhost:3001/api/getAllSurvey", user
           
           ).then(function (response) {
            
            console.log(response);
            const data = response.data[0]
            setMySurveys(data)
          })
            // store them in mySurveys variable
            // const data = res.data
            // setMySurveys(data)
          
        }
        getMySurveys();
    }, [])
    
    return (
        <div className="MySurveys">My Surveys
            <div className="DisplaySurveys">
           <text>{mySurveys.name}</text>
              
            </div>
        </div>
    )
   
}