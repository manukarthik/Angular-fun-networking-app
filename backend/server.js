var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose =  require('mongoose')
var jwt = require('jwt-simple')
var app = express();
var bcrypt= require('bcrypt-nodejs')
var User = require('./models/User.js')
var Post = require('./models/Post.js')
var auth = require('./auth.js')



app.use(cors())
app.use(bodyParser.json())

app.get('/posts/:id', async(req, res) => {
    var author = req.params.id
    var posts = await Post.find({ author })
    res.send(posts)
}, (err)=> {
    console.log("###",err);
    return err;
})

app.put('update/:id', auth.checkAuthenticated, (req,res)=>{
  console.log(req.body._id)
  console.log(req.body)
  var postData = req.body
  postData.author = req.userIds

     Post.findByIdAndUpdate({
                 id: postData._id
             }, {
                 $set: {
                     msg: "postData.msg"
                 }
             }, 
                 {
                     new: false
                 }
             
,(err, result) => {
         if (err) {
             console.error('saving post eror');
             return res.status(500).send({
                 message: 'saving post error'
             })
         }
         res.sendStatus(200)
     })
})

app.post('/post', auth.checkAuthenticated, (req, res) => {
    var postData = req.body
    postData.id = req.id
    postData.author = req.userId
    var post = new Post(postData)
    console.log(post)
    post.save((err, result) => {
        if (err) {
            console.error('saving post eror');
            return res.status(500).send({
                message: 'saving post error'
            })
        }
        res.sendStatus(200)
    })
})

app.get('/users',async(req, res) => {
    try{
        
        
        var users = await User.find({}, '-password -__v')
        res.send(users)
    }
    catch(error){
        console.error(console.error())
        res.sendStatus(500)
          
    }
})

app.get('/profile/:id', async (req, res) => {
    
    try {
    
        var user = await User.findById(req.params.id, '-password -__v')
        res.send(user)
    }
    catch (error) {
        console.error(console.error())
        res.sendStatus(500)

    }
})



mongoose.connect('mongodb://test:test@ds121589.mlab.com:21589/mean',(err)=>{
    if(!err) 
    console.log('Connected to mongo')
})

app.use('/auth', auth.router)
app.listen(process.env.PORT || 3000) 