import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SurveyResponse() {
    const [surveyTitle, setSurveyTitle] = useState("");
    const [surveyDesc, setSurveyDesc] = useState("");
    const [surveyIntro, setSurveyInfo] = useState([]);
    const [questionNum, setQuestionNum] = useState(1);
    const [surveyQuestions, setSurveyQuestions] = useState([]);
    const [questionChoices, setQuestionChoices] = useState([]);

    let id = useParams().surveyID;

    useEffect(() => {
        function getSurveyIntro() {
            axios.post("http://localhost:3001/api/getSurveyIntro", {
                surveyId: id
            }).then(function(response) {
                console.log(response.data[0]);
                setSurveyTitle(response.data[0].name);
                setSurveyDesc(response.data[0].survey_desc);
            })
        }
        function getSurveyInfo() {
            axios.post("http://localhost:3001/api/getSurveyQuestions", {
                surveyId : id
            }).then(function(response) {
                console.log(response);
                console.log(response.data);
                setSurveyInfo(response.data);
            })
        }
        
        getSurveyIntro();
        getSurveyInfo();
    }, []);

    return (
        <div>
            <h3>Survey Title: {surveyTitle}</h3>
            <h4>Survey Description: {surveyDesc}</h4>
            <h5>
                surveyInfo.map()
            </h5>
        </div>

    )
}
