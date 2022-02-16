const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const {check , validationResult} = require('express-validator/check')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const { route } = require('express/lib/application')

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

    const profileFields = {}
    profileFields.user = req.user.id;
    if(company){
        profileFields.company = company
    }
    if(website){
        profileFields.website = website
    }
    if(location){
        profileFields.location = location
    }
    if(bio){
        profileFields.bio = bio
    }
    if(status){
        profileFields.status = status
    }
    if(githubusername){
        profileFields.githubusername = githubusername
    }
    if(skills){
        profileFields.skills = skills.split(',').map(skill=>skill.trim())
    }

    // Making Social Object
    profileFields.socials = {}
    if(youtube){
        profileFields.socials.youtube = youtube
    }
    if(twitter){
        profileFields.socials.twitter = twitter
    }
    if(facebook){
        profileFields.socials.facebook = facebook
    }
    if(linkedin){
        profileFields.socials.linkedin = linkedin
    }
    if(instagram){
        profileFields.socials.instagram = instagram
    }


    try{
        let profile = await Profile.findOne({ user:req.user.id })
        if(profile){
            // Updating the profile
            profile = await Profile.findOneAndUpdate({ user:req.user.id },{ $set:profileFields },{new:true})
            return res.json(profile)
        }

        // Create
        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)
        
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route GET api/profile
// @desc This will get profiles
// @access Public

router.get('/',async(req,res)=>{
    try {
        const profiles = await Profile.find().populate('user',['name','avatar'])
        res.json(profiles)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


// @route GET api/profile/user/:user_id
// @desc Getting Profiles by user id
// @access Public

router.get('/user/:user_id',async(req,res)=>{
    try {
        const profile = await Profile.findOne({ user:req.params.user_id }).populate('user',['name','avatar'])
        if(!profile){
            return res.status(400).json({ msg:' There is no profile for this user' })
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg:'Profile not found' })
        }
        res.status(500).send('Server Error')
    }
})

// @route DELETE api/profile
// @desc This will delete profile,user and post
// @access Private

router.delete('/',auth,async(req,res)=>{
    try {

        // Removes Profile
        await Profile.findOneAndRemove({user : req.user.id})

        //Removes user
        await User.findOneAndRemove({_id : req.user.id})
        res.json({msg:'User Removed'})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route PUT api/profile
// @desc Add Profile Experience
// @access Private
router.put('/experience',[auth,[
    check('title','Title is required').not().isEmpty(),
    check('company','Company is required').not().isEmpty(),
    check('from','From Date is required').not().isEmpty(),
]
],async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const{
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } =  req.body

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id }) // Fetching profile by the user id
        profile.experience.unshift(newExp)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})


module.exports = router