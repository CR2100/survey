import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Select from 'react-select';

export default function CreateSurvey() {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [expire, setDate] = useState("");
  const [formValues, setFormValues] = useState([{ question: "" }]);
  //const [responseValues, setResponseValues] = useState([{ response: "" }]);
  const [count, setCount] = useState(0);
  const [type, setType] = useState(0);
  const n = 2;

  const [matrix, setMatrix] = useState(
    Array.from({ length: n - 1 }, () => Array.from({ length: n }, () => null))
  );

  console.log(matrix)

  const [typeValue, setValue]=useState('');
  const types = [
    {value: "multiple choice", label: "multiple choice"},
    {value: "true/false", label: "true/false"}]

  const handleChangeMatrix = (row, column, event) => {
    let copy = [...matrix];
    copy[row][column] = event.target.value;
    setMatrix(copy);
    console.log(matrix);
  };

  //function to get the max survey ID currently in the table
  //increment by 1 for the next survey - this will be concatenated to the link
  const getData = async () => {
    try {
      await axios
        .post("http://localhost:3001/api/getLastSurvey", {})
        .then(function (response) {
          setCount(response.data[0].Survey_ID + 1);
        });
    } catch (e) {
      console.log(e);
    }
  };

  //only get the updated survey ID once, following surveys will be incremented
  useEffect(() => {
    getData();
  }, []);

  //get the survey type (multiple choice, T/F)
  const getType = async () => {
    try {
      await axios.post("http://localhost:3001/api/getSType", {
        //send value selected from dropdown
        type: typeValue 
      }).then(function(response) {
          setType(response.data[0].Type_ID)
      })
    }
    catch (e) {
      console.log(e)
    }
  }

  //whenever a type is selected from the dropdown, store it to a variable 'typeValue'
  const handleSelect = (event) => {
    const typeValue = event.value
    setValue(typeValue)
  }

  //gets the 'typeValue' update following dropdown selection
  useEffect(() => {
    getType()
  }, [typeValue])

  //insert the survey details - this will be stored in the 'Survey' data table
  const insertSurvey  = () => {
    setCount(count + 1);
    //insert a new survey
    var username = localStorage.getItem("currUser");
    const link = "localhost:3000/SurveyResponse#" + count;
    axios
      .post("http://localhost:3001/api/insertSurvey", {
        user: username,
        type: type,
        title: title,
        desc: description,
        end: expire,
        link: link,
      })
      .then(function (response) {
        insertQuestions();
        if (response.status === 200) {
          swal("Survey successfully created!");
        }
        if (response.status === 201) {
          swal("Error!");
        }
      });
  };

  //complete insert questions method
  const insertQuestions = async () => {
    var once = false;
    var index = 0; //question ID index variable
    //Insert questions into Questions datatable by mapping through 'matrix'
    matrix.map(async function(element) {
      index = index + 1;
      once= true;
      await axios.post("http://localhost:3001/api/insertQuestion", {
          id: index,
          survey: count,
          desc: element[0],
        })
        .then(function(response) {
          if(once) {
            insertResponseOptions();
            once = false;
          }
        });
    });
  };

  const insertResponseOptions = () => {
    var index = 0;
    matrix.map(function(element) {
      index = index+1;
      for(let j = 1; j < element.length; j++) {
          axios.post("http://localhost:3001/api/insertResponseOptions", {
          qid: index,
          sid: count,
          option: element[j]
        }).then(function(response) {
        })
      }      
    })
  }

  let addFormFields = () => {
    // n=n+1;
    let myArray = [...matrix];
    var newRows = myArray.length;
    var newCols = myArray[0].length;
    newRows = newRows + 1;
    //  newRows = newRows+1;
    //  newCols = newCols+1;
    var item;

    for (var i = 0; i < newRows; i++) {
      item = myArray[i] || (myArray[i] = []);

      for (var k = item.length; k < newCols; k++) item[k] = 0;
    }

    setMatrix(myArray);
  };

  let removeFormFields = (i) => {
    let myArray = [...matrix];
    if(matrix.length > 1) {
      myArray.splice(i, 1);
      setMatrix(myArray);
    }
  }

  let addResponseFields = (i,j) => {
    //setResponseValues([...responseValues, {qid:0},{response: "" }])
    let myArray = [...matrix];
    var newCols = myArray[0].length;
    var newRows = myArray.length;
    //newRows = newRows+1;
    //  newRows = newRows+1;
    
    if(newCols < j+1){
    newCols = newCols + 1;}
    var item;

    for (var i = 0; i < newRows; i++) {
      item = myArray[i] || (myArray[i] = []);

      for (var k = item.length; k < newCols; k++) item[k] = 0;
    }

    setMatrix(myArray);
  };

  let removeResponseFields = (i,j) => {
    let myArray = [...matrix];
    console.log(myArray[i].length)
    if(myArray[i].length > 2) {
      myArray[i].splice(j, 1)
      setMatrix(myArray);
    }
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    const survey = {title, description, expire, matrix};
    alert(JSON.stringify(survey));
    console.log(survey);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="create">
        <h2>Create new survey</h2>
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
        <label>Select Survey Type:</label>
        <Select options={types} onChange={handleSelect}/>
        {QR()}
        <div class="buttonContainer">
          <button className="pushable marginLeft" onClick={insertSurvey}>
            <span class="front bigButton">Create Survey</span>
          </button>
        </div>  
      </div>
    </form>
  );

  function QR() {
    if(type == 2) {
    return (
      <form>
        {formValues.map((element, index) => (
          <div className="create" key={index}>
            <div class="buttonContainer">
              <span class="buttonContainer">
                <button
                  className="pushable"
                  type="button"
                  onClick={() => addFormFields()}
                >
                  <span class="front smallButton">Add Question</span>
                </button>
              </span>

              <span class="buttonContainer">
                <button
                  className="pushable"
                  type="button"
                  onClick={() => addResponseFields(0, 4)}
                >
                  <span class="front smallButton">Add Response</span>
                </button>
              </span>
            </div>
            <table>
            <tr>
                <th>Questions</th>
                <th>Options</th>
            </tr>
              <tbody>
                {matrix.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((column, columnIndex) => (
                      <td key={columnIndex}>
                        <input
                          type="text"
                          onChange={(e) =>
                          handleChangeMatrix(rowIndex, columnIndex, e)
                          }
                        />
                          {(() => {
                            if (columnIndex > 0) {
                              return (
                                <button
                                  className = "pushable"
                                  type = "button"
                                  onClick={() =>
                                  removeResponseFields(rowIndex, columnIndex)}
                                >
                                  <span class="front smallButton">X</span>
                                </button>
                              )
                            } else{
                                return(
                                  <button 
                                    className = "pushable"
                                    type="button"
                                    onClick={() =>
                                      removeFormFields(rowIndex)
                                    }
                                  >
                                  <span class="front smallButton">X</span> 
                              </button> 
                            )
                            }
                          })()}
                      </td>
                    ))}
                  </tr>                
                ))}
              </tbody>
            </table>
          </div>
        ))}  
      </form>
    )}
    else if(type == 3){
      return (
        <form>
          {formValues.map((element, index) => (
            <div className="create" key={index}>
              <div class="buttonContainer">
                <span class="buttonContainer">
                  <button
                    className="pushable"
                    type="button"
                    onClick={() => addFormFields()}
                  >
                    <span class="front smallButton">Add Question</span>
                  </button>
                </span>
  
                <span class="buttonContainer">
                  <button
                    className="pushable"
                    type="button"
                    onClick={() => addResponseFields(0, 2)}
                  >
                    <span class="front smallButton">Add Response</span>
                  </button>
                </span>
              </div>
              <table>
              <tr>
                  <th>Questions</th>
                  <th>Options</th>
              </tr>
                <tbody>
                  {matrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td key={0}>
                          <input
                            type="text"
                            placeholder="question..."
                            onChange={(e) =>
                              handleChangeMatrix(rowIndex, 0, e)
                            }
                          />
                      </td>
                      <td key={2}>
                      <select class="dropdown" onChange={(e) =>handleChangeMatrix(rowIndex,1,e)}>
                          <option value="Select...">Select...</option>
                          <option value="True">True</option>
                          <option value="Yes">Yes</option>
                          <option value="1">1</option>
                        </select>
                      </td>
                      <td key={3}>
                      <select class="dropdown" onChange={(e) => handleChangeMatrix(rowIndex,2,e)}>
                          <option value="Select...">Select...</option>
                          <option value="False">False</option>
                          <option value="No">No</option>
                          <option value="0">0</option>
                        </select>
                      </td>
                      <td>
                        <button 
                          className = "pushable"
                          type="button"
                          onClick={() =>
                            removeFormFields(rowIndex)
                          }
                        >
                          <span class="front smallButton">Remove</span> 
                        </button>
                      </td>
                    </tr>                
                  ))}
                </tbody>
              </table>
            </div>
          ))}  
        </form>
      )
    }
  }
}
