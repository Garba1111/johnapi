const emergency = require('../model/emergency');
const user = require('../model/user');


const router = require('express').Router()

router.get('/',async(req,res)=>{
    const auth = req.headers.authentification
  if (auth.length == 24 ) {
    try{
        const checkuser = await user.findOne({_id:auth});
    if (checkuser) {
        const allEmergency = await emergency.find({user:auth})
        res.json({access:true, error:false, Detail:checkuser,userE:allEmergency})
        
    } else {
        res.json({access:false, error:"invalid auth",})
        
    }
    }catch(error){
        console.log(error)
        res.json({access:false, error:"invalid auth",})

    }
  } else {
    res.json({access:false, error:"invalid auth",})
    
  }
})

module.exports= router