const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();
const app = express();
const router = require('./router');

const SELECT_ALL = 'select * from user_details';
const PORT = 5000;

var connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

connection.connect(err => {
    if(err){
        console.log("\ncannot establish connection with database");
        console.log(process.env.host);
        return err;
    }
    console.log("connection established with database");
});

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/forcast/", router);
app.use(express.static('public'));


app.get('/', (req, res) =>{
    const d = new Date();
    res.json({currentTime: d.toTimeString() });
    console.log('Received GET request.');
});

app.get('/users', (req, res) =>{
    connection.query(SELECT_ALL, (err, results) => {
        if(err){
            return res.send(err)
        }
        return res.json({
            data: results
        })
        
    });
});

app.get('/users/add', (req, res) =>{
    const {name, surname, admin} = req.query;
    console.log(name, surname, admin);
    const ADD_USER  = `insert into user_details(name, surname, admin) values('${name}', '${surname}', ${admin})`;
    connection.query(ADD_USER, (err, results) =>{
        if(err){
            return res.send(err)
        }else{
            return res.send('user added successfully to database');
        }
    });
});

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});