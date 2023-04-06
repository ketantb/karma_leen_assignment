const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const REGISTER = require('./register-model/registerModel')


router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, password, DOB, email, mobile, address1, address2, address3, address4, address5 } = req.body
        if (!firstName || !lastName || !password || !DOB || !email || !mobile || !address1) {
            console.log("please fill all field")
            return res.status(422).send("please fill all field")
        }
        else if (await REGISTER.findOne({ email })) {
            console.log("Email Already in Use")
            return res.status(400).send("Email Already in Use")
        }
        const newRegister = new REGISTER(req.body)
        const registerData = await newRegister.save()
        console.log(newRegister)
        res.json({ message: "Registration Successfull" })
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router