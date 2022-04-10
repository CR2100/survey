//import {dbServer, tunnelConfig, forwardConfig} from db.js

const mysql = require('mysql2');
const { Client } = require('ssh2');
const connection = module.exports = function(){};
const dbServer = {
    host: 'localhost',
    port: 3306,
    user: 'group3',
    password: 'olemiss2022',
    database: 'group3'
  }
const tunnelConfig = {
    host: 'turing.cs.olemiss.edu',
    port: 22,
    username: 'group3',
    password: 'olemiss2022'
  }
const forwardConfig = {
    srcHost: '127.0.0.1',
    srcPort: 3306,
    dstHost: dbServer.host,
    dstPort: dbServer.port
};

connection.invokeQuery = function(sqlQuery, data){
var sshClient = new Client();
const SSHConnection = new Promise((resolve, reject) => {
  
    sshClient.on('ready', () => {

        sshClient.forwardOut(   
        forwardConfig.srcHost,
        forwardConfig.srcPort,
        forwardConfig.dstHost,
        forwardConfig.dstPort,
        (err, stream) => {
             if (err) reject(err);
             const updatedDbServer = {
                 ...dbServer,
                 stream
            };
            const db =  mysql.createConnection(updatedDbServer);
           db.connect((error) => {
            if (error) {
                reject(error);
            }
            resolve(db);
            });
            db.query(sqlQuery, function (err, rows) {
                if(rows){
                }
                          if (err) 
                            throw err
                          else
                            data(rows);  
                        })                
        });
    }).connect(tunnelConfig)
});
}