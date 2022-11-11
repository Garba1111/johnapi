const mongoose= require('mongoose')

const Schema= mongoose.Schema

const user= new Schema({
    Username:{
        required:true,
        unique:true,
        type:String,
    },
    Email:{
        required:true,
        unique:true,
        type:String,
    },
    Password:{
        required:true,
        type:String,
    },
    verified:{
        required:true,
        type:Boolean,
        default:false
    }
})


module.exports= mongoose.model('User', user)