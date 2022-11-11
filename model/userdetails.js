const mongoose= require('mongoose')

const Schema= mongoose.Schema

const UserDetails= new Schema({
   userId:{
        required:true,
        unique:true,
        type:String
   },
   FLocation:{
        required:true,
        type:String
   },
   State:{
    required:true,
        type:String
   },
   description:{
    required:true,
        type:String
   }
})


module.exports= mongoose.model('UserDetails', UserDetails)