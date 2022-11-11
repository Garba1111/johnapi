const user = require("../../model/user");
const bcrypt = require("bcrypt");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const collect = req.body;

  try {
    if (collect.email != null && collect.password != null) {
      if (collect.email.length >= 5 && collect.password.length >= 6) {
        const checkuser = await user.findOne({ Email: collect.email });
        if (checkuser) {
          const verf = bcrypt.compareSync(collect.password, checkuser.Password);
          if (verf == true) {
            res.json({
              access: true,
              error: false,
              input: true,
              email: true,
              password: true,
              user: checkuser,
            });
          } else {
            res.json({
              access: true,
              error: false,
              input: true,
              email: true,
              password: false,
            });
          }
        } else {
          res.json({ access: true, error: false, input: true, email: false });
        }
      } else {
        res.json({ access: true, error: false, input: false });
      }
    } else {
      res.json({ access: true, error: false, input: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ access: false, error });
  }
});

module.exports = router;
