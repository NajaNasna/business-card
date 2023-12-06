const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.SECRET_KEY


router.post('/forgot-password', async(req,res)=>{
    const {email} = req.body
    try {
       const oldUser = await User.findOne({email});
       if(!oldUser){
        return res.json({status:"User does not exist"});
       }
    //    if(oldUser){
    //     return res.json({status:"true"});
    // }
       const secret =  jwtSecret + oldUser.password;
       const token = jwt.sign({email: oldUser.email, id: oldUser._id}, secret, {expiresIn: "5m"});
       console.log(oldUser._id)
       console.log("TOKEN----",token)
       const link = `http://127.0.0.1:5000/reset-password/${oldUser._id}/${token}` ;
       console.log(link)
     

    } catch (error) {
        console.log('---Error::::',error)
        
    }
});

router.get("/reset-password/:id/:token", async(req,res)=>{
    try {
        const{ id,token} = req.params
        console.log(req.params)
        console.log('ID:', oldUser._id);
        console.log('Token:', token);
        res.send("Done")
    } catch (error) {
        console.log(error)
    }
   

})








module.exports = router 