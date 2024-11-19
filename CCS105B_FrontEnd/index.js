// console.log(fetch('https://0.soompi.io/wp-content/uploads/2024/07/14232104/wonwoo-arena-3.png')
// .then(response =>{
//     console.log(response)
//     return response.blob()
// })
// .then(blob=>{
//     console.log(blob)
//     document.querySelector('#myImage').scr=URL.createObjectURL(blob)
// })
// .catch(error =>{
//     console.log(error)
// }))

const express = require('express')

const app = express()

const moment = require('moment')

const mysql = require("mysql")

const cors = require('cors')



const PORT=process.env.PORT || 1804



const logger = (req,res,next) => {

    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`)

    next()

}



app.use(logger)

app.use(cors())



// connection to mysql

const connection = mysql.createConnection({

    host:"localhost",

    user:"root",

    password:"",

    database:"employee"

})



//initilization of  connection

connection.connect()



//API

// Get request and response are the parameters

app.get("/api/hello",(req,res) => {

    //creat a query

    connection.query("SELECT * FROM userdata",(err,rows,fields) => {

        if(err) throw err

        res.json(rows)



    })

})

//api

//passing the id parameter

//request - >>> front end ID 

app.get("/api/hello/:id",(req,res) => {

    const id=req.params.id

    connection.query(`SELECT * FROM userdata WHERE id=${id}`,(err,rows,fields) => {

        if(err) throw err



        if(rows.length > 0){

            res.json(rows)

        }else{

            res.status(400).json({msg: `${id} id is not found`})

        }

    }) 

})



//post - create 

app.use(express.urlencoded({extended: false}))

app.post("/api/hello",(req,res) => {

    const fname = req.body.fname

    const lname = req.body.lname

    const email = req.body.email

    const gender = req.body.gender



    connection.query(`INSERT INTO userdata (first_name,last_name,email,gender) VALUES ('${fname}','${lname}','${email}','${gender}')`,(err,rows,fields) => {

        if(err) throw  err

        res.json({msg: `Successfully Inserted`})

    })



})



//CRUD

//API

//PUT - UPDATE

app.use(express.urlencoded({ extended: false }))

app.put("/api/hello", (req, res) => {

  const fname = req.body.fname

  const lname = req.body.lname

  const email = req.body.email

  const gender = req.body.gender

  const id = req.body.id

  connection.query(`UPDATE userdata SET first_name='${fname}', last_name='${lname}', email='${email}', gender='${gender}' WHERE id='${id}'`,(err, rows, fields) => {

      if (err) throw err

      res.json({ msg: `Successfully updated!` })

    }

  )

})




//delete api

app.use(express.urlencoded({extended: false}))

app.delete("/api/hello",(req,res) => {

    const id=req.body.id

    connection.query(`DELETE FROM userdata  WHERE id='${id}'`,(err,rows,fields) => {

        if (err) throw err

        res.json({ msg: `Successfully Deleted`})

    })

})





app.listen(1804, () => {

    console.log(`Ang server ay tumatakbo na sa port na ${PORT}`)

})
const content = document.querySelector("#content")

window.addEventListener("load",() => {
    getUsers();
})


function getUsers(){

    let html=" "

    // fetch("http://localhost:5000/api/members", {mode:"cors"}//cross origin offline
    fetch("http://localhost:5000/api/members", {mode:"cors"})//cross origin
    
    .then((response)=>{
        console.log(response)
        return response.json();
    })

    .then((data)=>{
        data.forEach((element)=>{
            html += `<li> ${element.first_name} ${element.last_name} </li>`
        })
        content.innerHTML = html
    })

    .catch((error)=>{
        console.log(error)
    })


}