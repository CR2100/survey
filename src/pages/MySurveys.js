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
         var username = localStorage.getItem("currUser");

           axios.post("http://localhost:3001/api/getUserSurveys", {
               user: username
         }).then(function (response) {
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
        <div>
            <div className="create">
            <h2>My Surveys</h2>
            <table>
                <tr>
                    <th>Survey Name</th>
                    <th>Description</th>
                    <th>Creation Date</th> 
                    <th>Expire Date</th>
                </tr>

                <tr>
                    <td>{mySurveys.name}</td>
                    <td>{mySurveys.survey_desc}</td>
                    <td>{mySurveys.creation_date}</td>
                    <td>{mySurveys.end_date}</td>
                </tr>
            </table>
            </div>
        </div>
    )
}

