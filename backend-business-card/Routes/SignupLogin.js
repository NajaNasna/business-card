const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.SECRET_KEY



router.post('/signupUser',
    body('email', 'Enter a valid email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })

    , async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            // let existMail = await User.findOne({email})

            // if(existMail){
            //     res.status(200).json({errors:errors.array()});
            //     res.send("Email already exist. Try logging with a new mail")
            // }
            // else{

            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
            })
            res.json({ success: true });
        }
    // }
        catch (error) {
            console.log(error)
            res.json({ success:false });

        }
   
    })
    

    router.post('/loginUser',
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Incorrect Password').isLength({min: 5}),
    async (req,res)=>{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        let email = req.body.email
        try {
            let userData = await User.findOne({email})
            if(!userData){
              return res.status(400).json({errors:"Try logging with correct credentials"})
            }

            if(userData){
                const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
            if(!pwdCompare){
                return res.status(400).json({errors:"Try logging with correct credentials"})
            }
            const data = {
                user:{
                    id:userData.id
                }
            }

            const authToken = jwt.sign(data,jwtSecret)
            return res.json({success: true, authToken:authToken})
            }

        } catch (error) {
            console.log(error)
            res.json({success:false});
        }
    }
    )



module.exports = router