import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

export default function MySurveys({ currUser }) {
  // mySurveys will hold an array of surveys returned from the API call to the database
  const [mySurveys, setMySurveys] = useState([]);

  const reroute = () => {
    window.location.href = '/createSurvey'
  }

  const handleDelete = (element) => {
    var deleted = parseInt(localStorage.getItem("lastSurvey"))
    console.log("current deleted id: " + deleted)
    if((deleted == null) || isNaN(deleted) || (deleted < element.Survey_ID)) {
      localStorage.setItem("lastSurvey", element.Survey_ID);
      console.log("current deleted id: " + localStorage.getItem("lastSurvey"))
    }

    axios.post("http://localhost:3001/api/deleteSurvey", {
      sid: element.Survey_ID
    
    }).then(function(response) {
      console.log(response)
      if (response.status === 200) {
        window.location.reload()
      }
      if (response.status === 201) {
        swal("Error!");
      }     
    })
  }

  useEffect(() => {
    // Pass appropriate info into getMySurveys
    function getMySurveys() {
      // Call API to get all surveys for a given user
      var username = localStorage.getItem("currUser");

      axios
        .post("http://localhost:3001/api/getUserSurveys", {
          user: username,
        })
        .then(function (response) {
          console.log(response);
          const data = response.data;
          setMySurveys(data);
        });
      // store them in mySurveys variable
      // const data = res.data
      // setMySurveys(data)
    }
    getMySurveys();
  }, []);
  return (
    <section>
      <div className="tbl-header">
        <table>
          <thead>
            <tr>
              <th>Survey Name</th>
              <th>Description</th>
              <th>Creation Date</th>
              <th>Expire Date</th>
              <th>Actions</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table>
          <tbody>
            {" "}
            {mySurveys.map((val) => (
              <tr key={val}>
                <td>{val.name}</td>
                <td>{val.survey_desc}</td>
                <td>{val.creation_date}</td>
                <td>{val.end_date}</td>
                <td>
                  <button class="pushable ">
                    <span class="front smallButton">Edit</span>
                  </button>
                  <button class="pushable marginLeft">
                    <span class="front smallButton">View Responses</span>
                  </button>
                  <button class="pushable marginLeft">
                    <span class="front smallButton" onClick = {(e) => handleDelete(val)}>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className = "buttonContainer">
          <button class="pushable MarginLeft">
            <span class="front bigButton" onClick={reroute}>Create New Survey</span>
          </button>
        </div>
    </section>
  );
}
