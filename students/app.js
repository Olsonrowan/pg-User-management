const express = require('express');
const app = express()
const { urlencoded } = require('express');
const db = require('./db');
const port = process.env.PORT || 3000
app.use(express.json())
app.use(urlencoded({extended: false}))
app.use(express.static('public'))





app.get("/getStudent", (req,res) =>{
    db.query('SELECT * FROM student', (err,data) =>{
        if(err)
        return next(err)
        res.send(data.rows);
        
    })

})

app.get("/getStudentAlphabetically", (req,res) =>{
    db.query('SELECT * FROM student ORDER BY lower(first_name)', (err,data) =>{
        if(err)
        return next(err)
        res.send(data.rows);
        
    })

})


app.post("/searchStudent", (req,res) =>{
    let last_name = req.body.last_name || req.body.first_name;
    let values=[last_name]
    let searchTerm = 'SELECT * FROM student WHERE last_name = $1 OR first_name = $1'
    db.query(searchTerm, values, (err,data) =>{
        if(err)
        return next(err)
        res.send(data.rows);
        
    })

})

app.get("/getStudentByDesc", (req,res) =>{
    db.query('SELECT * FROM student ORDER BY upper(first_name) DESC', (err,data) =>{
        if(err)
        return next(err)
        res.send(data.rows);
        
    })

})

app.post('/editStudent', (req,res) =>{
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let age = req.body.age;
    let id = req.body.id
    let sqlEdit = 'UPDATE student SET first_name = $1, last_name = $2, email = $3, age = $4 WHERE id = $5 RETURNING *'
    let values = [first_name, last_name, email, age, id];
    db.query(sqlEdit, values, (err, data) =>{
        if(err){
            return next(err)
        } else {
            res.send(data.rows[0]);
        }
    })

})

app.post("/addStudents", (req,res) =>{
    console.log(`POST /addUser: ${JSON.stringify(req.body)}`)
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let age = req.body.age;
    let text = 'INSERT INTO student (first_name, last_name, email, age) VALUES ($1, $2, $3, $4) RETURNING *';
    let values = [first_name, last_name, email, age];
    db.query(text, values, (err, data) =>{
        if(err){
            return next(err)
        } else {
        res.send(data.rows[0]);
        }
    })
})

app.post("/deleteStudent", (req,res) =>{
    let id = req.body.id;
    let userToDelete = 'DELETE FROM student WHERE id = $1';
    values= [id]
    db.query(userToDelete, values, (err, data) =>{
        if(err){
            return next(err)
        } else {
        res.send(`USER DELETED`);
        }
    })
    

})



app.listen(port, (err) =>{
    if (err){
        console.log(err)
    }
    console.log('we are listening to port 8080');
})