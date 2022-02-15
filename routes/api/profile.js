const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
// @route GET api/profile/me
// @desc Get current users profile
// @access Public
router.get('/me',auth,async(req,res)=>{
    try{
        // bringing in the avatar and name of the user from the User Model using populate() method
        const profile = await Profile.findOne({ user:req.user.id }).populate('user',['name','avatar'])

        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user'})
        }

        res.json()
    }
    catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router