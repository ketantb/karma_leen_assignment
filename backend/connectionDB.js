const mongoose=require('mongoose')

const key = "mongodb+srv://kbhatkhore777:karmaln@cluster0.0nxbydu.mongodb.net/?retryWrites=true&w=majority"
mongoose.set('strictQuery', true)
mongoose.connect(key)
mongoose.connection.on("connected",()=>console.log("Database Connected !!"))
mongoose.connection.on("error",()=>console.log("Database Connection error !!"))
