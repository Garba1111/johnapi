
const user = require('../model/user');

const emergency = require('../model/emergency');

const router = require('express').Router();

const date = require("date-and-time");

router.post('/:id',async (req,res)=>{
    const id = req.params.id;
    const collect = req.body;
    try {
       if (id.length == 24) {
         const checkuser = await user.findOne({_id:id})
        
         if (checkuser) {
            if (checkuser.verified == true) {
            
                if (collect.Name != null &&
                    collect.Description != null &&
                    collect.Flocation != null && 
                    collect.state != null &&
                    collect.Level != null ) {
                     if ((collect.Name).length>3  &&
                        (collect.Description).length>3 &&
                        (collect.Flocation).length>3 && 
                        (collect.state).length>3 &&
                        (collect.Level)>0 ) {
                    const now = new Date();
                    const addEmergency = new emergency({
                            userId:checkuser._id,
                            Descrption:collect.Description,
                            Flocation:collect.Flocation,
                            State:collect.state,
                            Date:date.format(now, 'hh:mm dd DD MMM YYYY'),
                            Level:collect.Level,
                            Name:collect.Name
    
                        })

                       await  addEmergency.save()
                       res.json({access:true, error:false, user:true,verified:true,input:true,upload:true})
                    } else {
            res.json({access:true, error:false, user:true,verified:true,input:false,upload:false})
                        
                    }
                } else {
            res.json({access:true, error:false, user:true,verified:true,input:false})
                    
                }
            } else {
            res.json({access:true, error:false, user:false,verified:true,input:false})
                
            }
            
           } else {
            res.json({access:true, error:false})
            
           }

            } else {
            res.json({access:true, error:false})
               
            }
             
    } catch (error) {
        console.log(error);
        res.json({access:false, error})
    }
})

module.exports= router