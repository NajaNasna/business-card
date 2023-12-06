const express = require('express')
const dotenv = require("dotenv").config();
const port = process.env.PORT
const app = express()
const cors = require('cors')

const mongoDB = require('./db')
mongoDB();


// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next()
// })

app.use(cors())

app.use(express.json())

app.use('/api',require("./Routes/SignupLogin"))
app.use('/api',require("./Routes/Forgot"))

app.get('/admin',(req,res)=>{
    res.send(`<h1>  Admin Page  </h1>` )
})

 app.listen(port,()=>{
    console.log(`Server started running on port ${port}`)
})