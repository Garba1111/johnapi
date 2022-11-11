const emergency = require('../model/emergency');

const router = require('express').Router()

router.get('/',async(req,res)=>{
    try {
        const allemergency= await emergency.find({})
        res.json({access:true, lists:allemergency})
    } catch (error) {
        console.log(error);
        res.json({access:false, error})
    }
})

module.exports= router