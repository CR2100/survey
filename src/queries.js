const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json())

//get all surveys
app.get("/api/get", (req, res)=>{
  db.query("SELECT * from Survey", (err, result)=> {
    if(err) {
      console.log(err)
    }
  res.send(result)
}); });

//get a specific survey
app.get("/api/getFromID/:id", (req, res)=>{
  const id = req.params.id;
  db.query("SELECT * FROM Survey WHERE Survey_ID = ?", id, (err, result)=>{
    if(err) {
      console.log(err)
    }
    res.send(result)
  }); });

//create a survey

//delete a survey

//update a survey
