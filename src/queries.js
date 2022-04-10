const connection = require('../src/connection')

//database connection
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const { chdir } = require("process");
const saltRounds = 10;
const app = express();
//for sending informatino from frontend to backend
app.use(cors());
app.use(bodyParser.json());
app.get('/beans', function (req, res){
  const sqlStatement = "INSERT INTO Login (username, password) VALUES ('ididit', 'right');"
  connection.invokeQuery(sqlStatement, function(rows){
    console.log(rows)
  })
})
//insert user

app.post("/register", async(req, res) => {
  try{
  const username = req.body.username;
  const password = req.body.password;
  const hash = await bcrypt.hash(password, saltRounds);
  //console.log(bcrypt.compareSync('fred', 10$8bASfVFjsISMkf7LoprtUe4EQ8YaX7OnVojYbIiUDOCUCV8CU8BCy)) // true)
  
    var sqlStatement = ('INSERT IGNORE INTO Login (username, password) VALUES (\''+username+'\',\''+hash+'\');')
   await connection.invokeQuery(sqlStatement, function(rows){
    console.log(rows.warningStatus) 
    if(rows.warningStatus === 1){
      res.status(201).json("user already exists")
    }else{
    res.status(200).send("all good!")
    }
    })
  }catch(e){
    console.log(e);
    res.status(500).send("something broke")
  }
  });
app.post('/login', async (req, res) => {
 
  var username = req.body.username;
  var password = req.body.password;
  //console.log(username)
  var concat = ['\''+username+'\''].join('\',\'');
  var sqlStatement = ('SELECT * FROM Login WHERE username ='+concat+';')
  //console.log(sqlStatement)
  
 const user = await connection.invokeQuery(sqlStatement, async function(rows){
 // console.log(rows[0])
  if(rows[0] !== undefined){
    const validPass = await bcrypt.compare(password, rows[0].password);
    if (validPass){
      res.status(200).json('valid username and password')
    } else{
      res.status(201).json('wrong password')
    }
  } else{
    res.status(202).json('User not found')
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
//  var username = req.body.user;
//var user = 1;
  var sqlStatement = ('SELECT * from Survey WHERE User_ID ='+user)
   connection.invokeQuery(sqlStatement, function(rows) {
    console.log(rows)
    res.send(rows)
  })
  }) 


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
