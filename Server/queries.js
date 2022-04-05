//database connection
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bcrypt = require("bcrypt");
const { chdir } = require("process");
const saltRounds = 10;

const app = express();

//for sending informatino from frontend to backend
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "group3",
  password: "olemiss2022",
  database: "survey_maker"
});

//insert user
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if(err) {
      console.log(err);
    }
    db.query("INSERT INTO Login(username, password) VALUES(?, ?)",
    [username, hash],
    (err, result) => {
      console.log(err);
    });
  });
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query("SELECT * FROM Login WHERE username = ?",
  [username],
  (err, result) => {
    if(err) {
      res.send({err: err});
    }
    if(result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) =>{
        if(response) {
          res.send(result);
        } else {
          res.send({ message: "Wrong username/password" });
        }
      });
    } else {
      res.send({message: "User doesn't exist"});
    }
  });
});

//create a survey
app.post("/api/insertSurvey", (req, res) => {
  const uid = req.body.uid;
  const title = req.body.title;
  const desc = req.body.description;
  const expire = req.body.expire;

  db.query("INSERT INTO Survey(User_ID, name, survey_desc, creation_date, end_date) values(?, ?, ?, NOW(), ?", 
  [uid, title, desc, expire], 
  (err, result) => {
    if(err) {
      console.log(err)
    } else {
      res.sendStatus("Survey created");
    }
  }); 
});

//get all surveys
app.get("/api/getAllSurvey", (req, res) => {
  query("SELECT * from Survey", (err, result)=> {
    if(err) {
      console.log(err)
    }
  res.send(result)
  }); 
});

//get a specific survey
app.get("/api/getSurveyID/:id", (req, res) => {
  const id = req.body.id;

  query("SELECT * FROM Survey WHERE Survey_ID = ?", id, (err, result) => {
    if(err) {
      console.log(err)
    }
    res.send(result)
  }); 
});

//update a survey
app.put('/api/updateSurvey/:id',(req,res) => {
  const id = req.param.id;
  const uid = req.body.uid;
  const title = req.body.title;
  const desc = req.body.description;
  const expire = req.body.expire;

  query("UPDATE Survey SET User_ID = ?, name = ?, survey_desc = ?, creation_date = NOW(), end_date = ? WHERE Survey_ID = ?",[uid, title, desc, expire, id], (err,result) => {
      if(err) {
     console.log(err)   
    } 
     res.send(result)
    });    
});

//delete a survey
app.delete('/api/deleteSurvey/:id',(req,res) => {
  const id = req.params.id;

  query("DELETE FROM Survey WHERE Survey_ID = ?",id, (err,result) => {
      if(err) {
     console.log(err)   
    } 
     res.send(result)
    });    
});

//add a survey question
app.post("/api/insertQuestion/:id", (req, res) => {
  const id = req.params.id;
  // const type;
  // const question;

  query("INSERT INTO Questions(Survey_ID, Type_ID, question_desc) VALUES(?, ?, ?)", [id, type, question], (err, result) => {
    if(err) {
      console.log(err)
    }
    res.send(result)
  }); 
});

//update a question
app.post('/api/updateQuestion/:id',(req,res) => {
  const qid = req.params.qid;
  // const id;
  // const type;
  // const desc;

  query("UPDATE Questions SET Survey_ID = ?, Type_ID = ?, question_desc = ? WHERE Questions_ID = ?",[id, type, desc, qid], (err,result) => {
      if(err) {
     console.log(err)   
    } 
     res.send(result)
    });    
});

//delete a question
app.post('/api/deleteQuestion/:id',(req,res) => {
  const qid = req.params.id;

  query("DELETE FROM Questions WHERE Question_ID = ?",[qid], (err,result) => {
      if(err) {
     console.log(err)   
    } 
     res.send(result)
    });    
});

//insert question response options
app.post("/api/insertResponseOption/:id", (req, res) => {
  const qid = req.params.id;
  // const id;
  // const option;

  query("INSERT INTO Response_Options(Question_ID, Survey_ID, option) VALUES(?, ?, ?)", [qid, id, option], (err, result) => {
    if(err) {
      console.log(err)
    }
    res.send(result)
  }); 
});

//update question response option
app.post('/api/updateResponseOption/:id',(req,res) => {
  const oid = req.params.qid;
  // const id;
  // const qid;
  // const option;

  query("UPDATE Response_Options SET Question_ID = ?, Survey_ID = ?, option = ? WHERE Option_ID = ?",[id, qid, option, oid], (err,result) => {
      if(err) {
     console.log(err)   
    } 
     res.send(result)
    });    
});

//delete a response option
app.post('/api/deleteResponseOption/:id',(req,res) => {
  const oid = req.params.id;

  query("DELETE FROM Response_Options WHERE Option_ID = ?",[oid], (err,result) => {
      if(err) {
     console.log(err)   
    } 
     res.send(result)
    });    
});

//insert survey response when a survey is submitted

app.listen(3001, () => {
  console.log("running server")
});
  