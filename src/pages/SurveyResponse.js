import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function SurveyResponse() {
    const [surveyInfo, setSurveyInfo] = useState({});
    const [surveyTitle, setSurveyTItle] = useState("");
    const [surveyQuestions, setSurveyQuestions] = useState([]);
    const [questionChoices, setQuestionChoices] = useState([]);

    useEffect(() => {
        var username = localStorage.getItem("currUser");
        axios.post("http://localhost:3001/api/getSurveyInfo", {
            user: "lkn56",
            surveyId: 4
        }).then(function(response) {
            console.log(response);
            const data = response.data[0];
            console.log(data);
        })
    }, []);

    return (
        <div>Response</div>
    )
}
