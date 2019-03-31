var mongoose= require('mongoose')

module.exports=mongoose.model('Post',{
    id:Number,
    msg : String,
    author:{type: mongoose.Schema.Types.ObjectId, ref:'User'}
})