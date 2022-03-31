import express, { json } from 'express';
import { query } from './config/Db';
import cors from 'cors';

const app = express();
const  PORT = 3002;
app.use(cors());
app.use(json())

//get all surveys
app.get("/api/get", (req, res)=>{
  query("SELECT * from Survey", (err, result)=> {
    if(err) {
      console.log(err)
    }
  res.send(result)
}); });

//get a specific survey
app.get("/api/getFromID/:id", (req, res)=>{
  const id = req.params.id;
  query("SELECT * FROM Survey WHERE Survey_ID = ?", id, (err, result)=>{
    if(err) {
      console.log(err)
    }
    res.send(result)
  }); });

//create a survey

//delete a survey

//update a survey
