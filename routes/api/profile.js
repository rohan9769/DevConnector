const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const {check , validationResult} = require('express-validator/check')
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

// @route POST api/profile
// @desc Create or update user profile
// @access Private
router.post('/',[auth,
    check('status','Status is required').not().isEmpty(),
    check('skills','Skills is required').not().isEmpty()
],
async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() })
    }
    const{
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    
})

module.exports = router