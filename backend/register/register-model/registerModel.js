const mongoose = require("mongoose")

const registerSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    DOB: {type: String, required: true},
    email: {type: String, required: true},
    mobile: {type: String, required: true},
    address1: {type: String},
    address2: {type: String},
    address3: {type: String},
    address4: {type: String},
    address5: {type: String}
})

const REGISTER = mongoose.model('register', registerSchema)
module.exports = REGISTER;