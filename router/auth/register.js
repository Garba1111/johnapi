const user = require("../../model/user");
const randtoken = require("rand-token").generator();
const bcrypt = require("bcrypt");
const userdetails = require("../../model/userdetails");
const verification = require("../../model/verification");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const collect = req.body;
  try {
    if (
      collect.username != null &&
      collect.email != null &&
      collect.password != null &&
      collect.location != null &&
      collect.state != null &&
      collect.description != null
    ) {
      if (
        collect.username.length >= 3 &&
        collect.email.length >= 5 &&
        collect.password.length >= 6 &&
        collect.location.length >= 6 &&
        collect.state.length >= 2 &&
        collect.description.length >= 10
      ) {
        const adduser = new user({
          Username: collect.username,
          Email: collect.email,
          Password: bcrypt.hashSync(collect.password, 5),
          verified: false,
        });

        const saveuser = await adduser.save();

        const adddetails = new userdetails({
          userId: saveuser._id,
          FLocation: collect.location,
          State: collect.state,
          description: collect.description,
        });

        const saveDet = await adddetails.save();

        const addverf = new verification({
          userId: saveuser._id,
          otp: randtoken.generate(4, "0123456789"),
          resetCode: randtoken.generate(
            16,
            "0123456789qwertyuiopasdfghjklzxcvbnm$"
          ),
        });

        addverf.save();

        res.json({
          access: true,
          error: false,
          input: true,
          user: {
            main: saveuser,
            others: saveDet,
          },
        });
      } else {
        res.json({ access: false, error: false, input: false });
      }
    } else {
      res.json({ access: false, error: false, input: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ access: false, error });
  }
});

module.exports = router;
