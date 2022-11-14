const emergency = require('../model/emergency');
const user = require('../model/user');


const router = require('express').Router()

router.get('/:id',async(req,res)=>{
    const auth = req.headers.authentification
    const id = req.params.id
  if (auth.length == 24 ) {

    try{
        const checkuser = await user.findOne({_id:auth});
    if (checkuser) {
        const allEmergency = await emergency.findOneAndDelete({_id:id})
        res.json({access:true, error:false,deleted:true, user:checkuser})
        
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