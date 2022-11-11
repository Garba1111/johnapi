// const emergency = require("../../../model/emergency");
const router = require("express").Router();

const randtoken = require("rand-token").generator();
const verification = require("../../../model/verification");
const nodemailer = require("nodemailer");
const user = require("../../../model/user");

const myemail = nodemailer.createTransport({
  service: process.env.service,
  host: process.env.host,
  port: 465,
  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    if (id.length == 24) {
      const checkuser = await user.findOne({
        _id: id,
      });
      if (checkuser) {
        const otp = randtoken.generate(4, "0123456789");
        const reset = randtoken.generate(
          16,
          "1234567890abcdefghijklmnopqrstuvwxyz$"
        );
        await verification.updateOne({ userId: id }, { otp, resetCode: reset });

        const mailoption = {
          from: process.env.email,
          to: checkuser.Email,
          subject: `${checkuser.Username} otp here`,
          html: `
                <body>
                <center><h3 style='color:green;'>otp is</h3></center>
                <center><h3 style='color:red;'>${otp}</h3></center>
                <center><p style='color:green;'>please do not disclose otp</p></center>
                
                </body>`,
        };
        await myemail.sendMail(mailoption)
        res.json({access: true, error: false, user: true, upload:true, details:checkuser})
      }else{
      res.json({ access: true, error: false, user: false });

      }
    } else {
      res.json({ access: true, error: false, user: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ access: false, error });
  }
});

router.post('/:id',async(req,res)=>{
    const id = req.params.id 
    const collect = req.body
    try {
        if (id.length==24) {
            const chkuser= await user.findOne({_id:id})
            if (chkuser) {
                const getverifs= await verification.findOne({userId:id})
                if (getverifs) {
                    if (collect.Otp!=null) {
                        if (collect.Otp== getverifs.otp) {
                            await user.updateOne({_id:id},{verified:true} )
                            await verification.updateOne({userId:id},{otp:randtoken.generate(4,'1234567890'),

                            resetCode:randtoken.generate(16,'qwertyuhgfddcv')
                            })

                            res.json({
                                access: true,
                                error: false,
                                user: true,
                                input: true,
                                otp: true,
                                verify:true,
                                user:chkuser
                            });

                        } else {
                            res.json({
                                access: true,
                                error: false,
                                user: true,
                                input: true,
                                otp: false,

                            });
                        }

                    } else {

                    }
                }
            } 
        }
    } catch(error){
        console.log(error);
        res.json({access:false,error})
    }
    
})

module.exports = router;
