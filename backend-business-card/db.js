const mongoose = require('mongoose')
const DB = process.env.DB

const mongoDB = async()=>{
    try {
       await mongoose.connect(DB).then(()=>{
        console.log('connected successfully')
       })
    } catch (error) {
        console.log('---Error:',error)
    }
}

module.exports = mongoDB;