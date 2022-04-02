import React, { useState } from 'react'

const CreateSurvey = () => {
    const [title, setTitle] = useState('');
    const [formValues, setFormValues] = useState([{ question: ""}])
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
        const survey = {title, formValues}
        alert(JSON.stringify(survey));
        console.log(survey);
    }
    return (
        <form  onSubmit={handleSubmit}>
        <div className="create">
            <h2>Create new survey</h2>
            <p>{ title }</p>
            <button className="button add" type="button" onClick={() => addFormFields()}>Add Question</button>
              <button className="button submit" type="submit">Submit</button>
            <form>
                <label>Survey Title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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

export default CreateSurvey;
