import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function CreateSurvey() { 
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const [expire, setDate] = useState('');
    const [formValues, setFormValues] = useState([{ question: ""}])

    const insertSurvey = () => {
      // Pass appropriate info into getMySurveys
          // insert a new survey for the current user
       var username = localStorage.getItem("currUser");

         axios.post("http://localhost:3001/api/insertSurvey", {
             user: username,
             title: title,
             desc: description,
             end: expire

       }).then(function (response) {
          console.log(response);
          const data = response.data[0]
          setTitle(data)
        })
          // store them in mySurveys variable
          // const data = res.data
          // setMySurveys(data)
  };

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
     }
        
    let addFormFields = () => {
        setFormValues([...formValues, { question: "" }])
     }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    let handleSubmit = (event) => {
        event.preventDefault();
        const survey = {title, description, expire, formValues}
        alert(JSON.stringify(survey));
        console.log(survey);
    }
    return (
        <form  onSubmit={handleSubmit}>
        <div className="create">
            <h2>Create new survey</h2>
            <p>{ title }</p>
            <button className="button add" type="button" onClick={() => addFormFields()}>Add Question</button>
              <button onClick= {insertSurvey}>Submit</button>
            <form>
                <label>Survey Title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </form>
            <form>
                <label>Description:</label>
                <input
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDesc(e.target.value)}
                />
            </form>
            <form>
                <label>Expiration Date:</label>
                <input
                    type="date"
                    required
                    value={expire}
                    onChange={(e) => setDate(e.target.value)}
                />
            </form>
        </div>
        {formValues.map((element, index) => (
              
              <div className="create" key={index}>
                
                <label>{"Question " + (index +1) }</label>
                <input type="text" name="question" value={element.question || ""} onChange={e => handleChange(index, e)} />
                {
                  index ? 
                    <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                  : null
                }
                
              </div>
              
            ))}
            
        </form>
        
    )
}
