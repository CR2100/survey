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
  connection.invokeQuery(sqlStatement, [username, password], function(rows){
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
  
  //var sqlStatement = ('INSERT IGNORE INTO Login (username, password) VALUES (\''+username+'\',\''+hash+'\');')
  var sqlStatement = 'INSERT IGNORE INTO Login (username, password) VALUES (?, ?)'
   await connection.invokeQuery(sqlStatement, [username, hash], function(rows){
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
  // var concat = ['\''+username+'\''].join('\',\'');
  // var sqlStatement = ('SELECT * FROM Login WHERE username ='+concat+';')
  var sqlStatement = ('SELECT * FROM Login WHERE username = ?')
  
 const user = connection.invokeQuery(sqlStatement, [username], async function (rows) {
   if (rows[0] !== undefined) {
     const validPass = await bcrypt.compare(password, rows[0].password);
     if (validPass) {
       res.status(200).json('valid username and password');
     } else {
       res.status(201).json('wrong password');
     }
   } else {
     res.status(202).json('User not found');
   }
 });
});

//create a survey
app.post("/api/insertSurvey", (req, res) => {
  const user = req.body.user;
  const title = req.body.title;
  const desc = req.body.desc;
  const expire = req.body.end;
  const link = req.body.link;

  // var query = ('INSERT INTO Survey(username, name, survey_desc, creation_date, end_date, link) VALUES('+'"'+user+'",'+'"'+title+'",'+'"'+desc+'",'+"NOW(),"+"'"+expire+"'," +'"'+link+'"'+");" )
  var query = 'INSERT INTO Survey(username, name, survey_desc, creation_date, end_date, link) VALUES(?, ?, ?, NOW(), ?, ?)'
  connection.invokeQuery(query, [user, title, desc, expire, link], function(rows) {
    console.log(rows)
    res.send(rows)
  }) 
})

app.post("/api/getLastSurvey", (req, res) => {
  var query = 'SELECT Survey_ID FROM Survey WHERE Survey_ID = (SELECT max(Survey_ID) FROM Survey)'
  connection.invokeQuery(query, [], function(rows) {
    console.log(rows)
    res.send(rows)
  })
})

app.post("/api/getQType", (req, res) => {
  type = req.body.type
  // var query = ('SELECT Type_ID FROM Question_Types WHERE Type_Name ='+'"'+type+'";')
  var query = 'SELECT Type_ID FROM Question_Types WHERE Type_Name = ?'
  console.log(query)
  connection.invokeQuery(query, [type], function(rows) {
    console.log(rows)
    res.send(rows)
  })
})

//get all surveys for user
app.post('/api/getUserSurveys', async (req, res) => {
  var username = req.body.user
  // var sqlStatement = ('SELECT * from Survey WHERE username = ' + '"' + username + '"')
  var sqlStatement = ("SELECT * from Survey WHERE username = ?")
  //console.log(sqlStatement)
   connection.invokeQuery(sqlStatement, username, function(rows) {
    console.log(rows)
    res.send(rows)
    })
  }) 

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
app.post("/api/insertQuestion", (req, res) => {
  const id = req.body.id;
  const survey = req.body.survey;
  const type = req.body.type;
  const desc = req.body.desc;

  //var query = ('INSERT INTO Questions(Question_Id, Survey_ID, Type_ID, question_desc) VALUES('+id+','+survey+','+type+','+'"'+desc+'");')
  var query = 'INSERT INTO Questions(Question_Id, Survey_ID, Type_ID, question_desc) VALUES(?, ?, ?, ?)'
  connection.invokeQuery(query, [id, survey, type, desc] ,function(rows) {
    console.log(rows)
    res.send(rows)
  }) 
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
