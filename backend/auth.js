var User=require('./models/User.js')
var jwt = require('jwt-simple')
var bcrypt = require('bcrypt-nodejs')
var express=require('express')
var router=express.Router()



   router.post('/register' , (req, res) => {
    var userData = req.body;
    var user = new User(userData)
    user.save((err, newUser) => {
        if(newUser )
        if(err)
        return res.status(500).send({ message: 'error saving user' })

        createSendToken(res, newUser)
    })
})

// router.get('/',(req,res)=>{
//     var loggedin=jwt.Use
// })

       router.post('/login', async (req, res) => {
        var LoginData = req.body;
        var user = await User.findOne({ email: LoginData.email })
        if (!user)
            return res.status(401).send({ message: 'Email or Password invalid' })
        bcrypt.compare(LoginData.password, user.password, (err, isMatch) => {
            if (!isMatch)
                return res.status(401).send({ message: 'Email or passoword invalid' })
            createSendToken(res,LoginData)
            return (LoginData)

        })

       })
       function createSendToken(res, user) {
           var payload = { sub: user._id }

           var token = jwt.encode(payload, '123')

           res.status(200).send({ token })
       }

       router.get('/auth', async(req,res)=>{
           var payload = jwt.decode(token, '123');
           req.userId = payload.sub;
       })
var auth = {
    router, //Express middleware to check the authorization header
     checkAuthenticated : (req, res, next)=> {
    if (!req.header('authorization'))
        return res.status(401).send({ message: 'Unauthorized. Missing Auth header' })
    var token = req.header('authorization').split(' ')[1]

    var payload = jwt.decode(token, '123')
    if (!payload)
        return res.status(401).send({ message: 'Unauthorized.Auth header Invalid' })

    req.userId = payload.sub
    console.log(req.userId);
    next()

}
}

module.exports = auth