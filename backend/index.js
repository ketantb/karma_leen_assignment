const express = require('express')
const app = express()
const cors = require("cors");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser=require('body-parser')
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
require('./connectionDB.js')
app.use(require("./register/register.js"))
app.use(require("./siginin/signin.js"))

const PORT =  3000|| process.env.PORT;

app.get('/', (req, res) => {
    try{
    res.status(200).send("Hello World!")
    }
    catch{
        res.err(404).send({"message": "server not working"})
    }
})
  
app.listen(PORT, () => {
    console.log(`App listening to port: ${PORT} !`)
})