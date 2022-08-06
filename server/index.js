const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = mysql.createPool({
    user: "root",
    host: "localhost",
    password: "rootpassword",
    database: "crud_users",
});



app.get('/api/get', (req, res) => {
    const sqlGet = "SELECT * FROM usersdata"
    db.query(sqlGet, (error, result) => {
        res.send(result);
    })
});


app.get('/api/get/:id', (req, res) => {
    const{id} = req.params
    const sqlGet = "SELECT * FROM usersdata WHERE id = ?"
    db.query(sqlGet, id,(error, result) => {
        if(error){
            console.log(error)
        }
        res.send(result);
    })

});

app.put('/api/update/:id', (req, res) => {
    const{id} = req.params
    const{firstname, lastname, email, phone, password} = req.body
    const sqlUpdate = "UPDATE usersdata SET firstname = ?, lastname = ?, email = ?, phone = ?, password = ? WHERE id = ?"
    db.query(sqlUpdate, [firstname, lastname, email, phone, password, id],(error, result) => {
        if(error){
            console.log(error)
        }
        res.send(result);
    })

});

app.post('/api/post', (req, res) => {

    const{firstname, lastname, email, phone, password} = req.body
    const sqlInsert = "INSERT INTO usersdata(firstname, lastname, email, phone, password) VALUES(?, ?, ?, ?, ?)";

    db.query(sqlInsert, [firstname, lastname, email, phone, password], (error, result) => {
        if(error) console.log(error)
    })
});

app.delete('/api/remove/:id', (req, res) => {
    const{id} = req.params
    const sqlRemove = "DELETE FROM usersdata WHERE id = ?";

    db.query(sqlRemove, id, (error, result) => {
        if(error) console.log(error)
    })
});

app.listen(5000, () => {
    console.log("server is running on port 5000");
});