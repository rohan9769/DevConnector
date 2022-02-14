const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const {check , validationResult} = require('express-validator/check')
const User = require('../../models/User')

// @route GET api/users
// @desc Register User
// @access Public
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6})
],async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {name,email,password} = req.body;

    try{
        // Checking if user exists
        let user = await User.findOne({ email })
        if(user){
            return res.status(400).json({errors:[{msg:'User Already Exists'}]});
        }
        // Getting users avatar
        const avatar =  normalize(gravatar.url(email,{
            s:'200', // size of the avatar
            r:'pg', // rating of the avatar
            d:'mm' //
        }),{forceHttps:true})
        user = new User({
            name,
            email,
            avatar,
            password
        })
        // Encrypting Password using BCrypt
        const salt = await bcrypt.genSalt(10); // Hashing
        user.password = await bcrypt.hash(password,salt)
        await user.save()
        // Return JSONWebToken JWT

        res.send('User Registered')
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }
    
})

module.exports = router
