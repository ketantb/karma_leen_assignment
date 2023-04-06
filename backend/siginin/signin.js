const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const jwt = require('jsonwebtoken')
const REGISTER = require('../register/register-model/registerModel')

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        const userEmail = await REGISTER.findOne({ email: email })
        if (email != userEmail.email) {
            console.log("Invalid Email or Password")
            return res.status(400).send("Invalid Email or Password")
        }
        else if (email != userEmail.email) {
            console.log("Invalid Email")
            return res.status(400).send("Invalid Email")

        }
        if (userEmail) {
            // const passwordMatch = await bcrypt.compare(password, userEmail.password)
            if (userEmail.password == password) {
                const dataTobeSentToFrontend = {
                    _id: userEmail._id
                }
                const token = jwt.sign(dataTobeSentToFrontend, "secretKey", { expiresIn: 10000 })

                res.status(200).send({
                    success: true,
                    message: 'Login Successful',
                    data: { token, userEmail: userEmail.email }
                });

            }
            else {
                console.log("Invalid Password")
                res.status(400).send("Invalid Password")
            }
        }
    }
    catch (err) {
        res.status(400).send(err)
        console.log(err)
    }
})

router.get('/users', async (req, res) => {
    try {
        const userEmail = req.query.userEmail
        const userData = await REGISTER.findOne({ email: req.query.userEmail })
        res.status(200).send(userData)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
})

router.put('/update/:id', async (req, res, next) => {
    // console.log(req.params.id)
    try{
        const userEmail = req.params.id
        const userData = await REGISTER.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(() => {
            console.log("updation successfull !")
            res.json({message: "updation successful!"})
        })
    }
    catch(err){
        res.status(500).json({ message: err })
    }
})

module.exports = router;