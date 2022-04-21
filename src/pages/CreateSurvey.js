import React, { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert';

export default function CreateSurvey() { 
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const [expire, setDate] = useState('');
    const [formValues, setFormValues] = useState([{ question: ""}])
    const [responseValues, setResponseValues] = useState([{ response: ""}])
    const [count, setCount] = useState(0)
    const [type, setType] = useState(0)

    const getData = async () => {
      try {
        await axios.post("http://localhost:3001/api/getLastSurvey", {
        }).then(function(response) {
            setCount(response.data[0].Survey_ID+1)
        })
      }
      catch (e) {
        console.log(e)
      }
    }
    
    useEffect(() => {
      getData()
    }, [])

    //get the 
    const getType = async () => {
      try {
        await axios.post("http://localhost:3001/api/getQType", {
          //send value selected from dropdown
          type: "multiple choice" //this is a placeholder until type can be selected on front-end
        }).then(function(response) {
            setType(response.data[0].Type_ID)
        })
      }
      catch (e) {
        console.log(e)
      }
    }

    useEffect(() => {
      getType()
    }, [])

    const insertSurvey = () => {
      setCount(count+1)
      //insert a new survey
       var username = localStorage.getItem("currUser");
       const link = "localhost:3000/SurveyResponse#"+count

      axios.post("http://localhost:3001/api/insertSurvey", {
          user: username,
          title: title,
          desc: description,
          end: expire,
          link: link
       }).then(function (response) {
          insertQuestions()
        })
  };

  //complete insert questions method
  const insertQuestions = () => {
    var index = 0
    //Insert questions into Questions datatable by mapping through formValues
    formValues.map(function(element) {
      index = index+1
      axios.post("http://localhost:3001/api/insertQuestion", {
        id: index,
        survey: count,
        type: type,
        desc: element.question
      }).then(function(response) {
        if(response.status === 200){
          swal("Survey successfully created!");
      }
      if(response.status === 201){
          swal("Error!");
      }
      })
    })
  }

  // const insertResponseOptions = () => {
  //   responseValues.map(function(element) {
  //     axios.post("http://localhost:3001/api/insertResponseOptions", {
  //       question: ,
  //       survey: count,
  //       option: element.response
  //     }).then(function(response) {
  //       console.log(element.question)
  //     })
  //   })
  // }

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
     }

     let handleChange2 = (i, e) => {
      let newResponseValues = [...responseValues];
      newResponseValues[i][e.target.name] = e.target.value;
      setFormValues(newResponseValues);
    }
        
    let addFormFields = () => {
        setFormValues([...formValues, { question: "" }])
     }

     let addResponseFields = (i) => {
      //setResponseValues([...responseValues, {qid:0},{response: "" }])
      setResponseValues([...responseValues, {response: "" }])
    }

    let removeFormFields = (i) => {
      let newFormValues = [...formValues];
      newFormValues.splice(i, 1);
      setFormValues(newFormValues)
    }

    let removeResponseFields = (i) => {
      let newResponseValues = [...responseValues];
      newResponseValues.splice(i, 1);
      setResponseValues(newResponseValues)
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        const survey = {title, description, expire, formValues, responseValues}
        alert(JSON.stringify(survey));
        console.log(survey);
    }
    return (
        <form  onSubmit={handleSubmit}>
        <div className="create">
            <h2>Create new survey</h2>
            <p>{ title }</p>
            <button className="pushable" type="button" onClick={() => addFormFields()}>
              <span class="front bigButton">
               Add Question
              </span>
            </button>
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
                
                <label>{"Question " + (index+1) }</label>
                <input type="text" name="question" value={element.question || ""} onChange={e => handleChange(index, e)} />
                <button  type="button" onClick={() => addResponseFields(index)}>Add Option</button>
                {
                  index ? 
                    <button type="button"   onClick={() => removeFormFields(index)}>Remove</button> 
                    :null
                }
                {responseValues.map((element, index) => (
                  <div className="response" key={index}>
                    <label>{"Option " + (index+1) }</label>
                    <input type="text" name="response" value={element.response || ""} onChange={e => handleChange2(index, e)} />
                    {
                      index ? 
                        <button type="button"  onClick={() => removeResponseFields(index)}>Remove</button> 
                      : null
                    }
                  </div>
                ))}       
                         
              </div>
              
            ))} 
             <button className="pushable" onClick={insertSurvey}>
            <span class="front bigButton">
            Submit
            </span>
            </button>
        </form>
    )
}
