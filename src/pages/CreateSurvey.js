import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

export default function CreateSurvey() {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [expire, setDate] = useState("");
  const [formValues, setFormValues] = useState([{ question: "" }]);
  const [responseValues, setResponseValues] = useState([{ response: "" }]);
  const [count, setCount] = useState(0);
  const [type, setType] = useState(0);
  const n = 2;
  const [matrix, setMatrix] = useState(
    Array.from({ length: n - 1 }, () => Array.from({ length: n }, () => null))
  );

  const handleChangeMatrix = (row, column, event) => {
    let copy = [...matrix];
    copy[row][column] = event.target.value;
    setMatrix(copy);

    console.log(matrix);
  };

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

  useEffect(() => {
    getData();
  }, []);

  //get the
  const getType = async () => {
    try {
      await axios
        .post("http://localhost:3001/api/getQType", {
          //send value selected from dropdown
          type: "multiple choice", //this is a placeholder until type can be selected on front-end
        })
        .then(function (response) {
          setType(response.data[0].Type_ID);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getType();
  }, []);

  const insertSurvey = () => {
    setCount(count + 1);
    //insert a new survey
    var username = localStorage.getItem("currUser");
    const link = "localhost:3000/SurveyResponse#" + count;

    axios
      .post("http://localhost:3001/api/insertSurvey", {
        user: username,
        title: title,
        desc: description,
        end: expire,
        link: link,
      })
      .then(function (response) {
        insertQuestions();
      });
  };

  //complete insert questions method
  const insertQuestions = () => {
    var index = 0;
    //Insert questions into Questions datatable by mapping through formValues
    formValues.map(function (element) {
      index = index + 1;
      axios
        .post("http://localhost:3001/api/insertQuestion", {
          id: index,
          survey: count,
          type: type,
          desc: element.question,
        })
        .then(function (response) {
          if (response.status === 200) {
            swal("Survey successfully created!");
          }
          if (response.status === 201) {
            swal("Error!");
          }
        });
    });
  };

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
  };

  let handleChange2 = (i, e) => {
    let newResponseValues = [...responseValues];
    newResponseValues[i][e.target.name] = e.target.value;
    setFormValues(newResponseValues);
  };

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

  let addResponseFields = (i) => {
    //setResponseValues([...responseValues, {qid:0},{response: "" }])
    let myArray = [...matrix];
    var newCols = myArray[1].length;
    var newRows = myArray.length;
    //newRows = newRows+1;
    //  newRows = newRows+1;
    if(newCols <5){
    newCols = newCols + 1;}
    var item;

    for (var i = 0; i < newRows; i++) {
      item = myArray[i] || (myArray[i] = []);

      for (var k = item.length; k < newCols; k++) item[k] = 0;
    }

    setMatrix(myArray);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let removeResponseFields = (i) => {
    let newResponseValues = [...responseValues];
    newResponseValues.splice(i, 1);
    setResponseValues(newResponseValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    const survey = { title, description, expire, formValues, responseValues };
    alert(JSON.stringify(survey));
    console.log(survey);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="create">
        <h2>Create new survey</h2>
        <p>{title}</p>
        <button
          className="pushable"
          type="button"
          onClick={() => addFormFields()}
        >
          <span class="front bigButton">Add Question</span>
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
         
          <h1></h1>
          {index ? (
            <button type="button" onClick={() => removeFormFields(index)}>
              Remove Question
            </button>
          ) : null}
          <button type="button" onClick={() => addResponseFields(0)}>
            Add Optionssss
          </button>

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
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <button
        className="pushable"
        type="button"
        onClick={() => addFormFields()}
      >
        <span class="front bigButton">Add Question</span>
      </button>
      <button className="pushable marginLeft" onClick={insertSurvey}>
        <span class="front bigButton">Submit</span>
      </button>
    </form>
  );
}
