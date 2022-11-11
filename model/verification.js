const mongoose= require('mongoose')

const Schema= mongoose.Schema

const Verf= new Schema({
   userId:{
        required:true,
        unique:true,
        type:String
   },
   otp:{
        required:true,
        type:String
   },
   resetCode:{
    required:true,
        type:String
   },
   
})


module.exports= mongoose.model('Verification', Verf)