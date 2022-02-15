const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req,res,next){
    // Getting the Token from the Header
    const token = req.header('x-auth-token')

    // Checking if there is no Token
    if(!token){
        return res.status(401).json({msg:'No Token , authorization denied'})
    }

    // Verifying the Token
    try{
        const decoded = jwt.verify(token,config.get('jwtSecret'))
        req.user = decoded.user
        next()
    }
    catch(err){
        res.status(401).json({msg:'Token is not valid'})
    }
}