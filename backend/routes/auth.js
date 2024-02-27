const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const fetchuser = require("../middleware/fetchuser");
// use for password hashing

const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const JWT_SECRET = "Rahul";

// 1. Create a User using:post "/api/auth/createuser"  no authentication needed
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if there are errirs return bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check wheather the email is already exist or not

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        let success = false;
        return res
          .status(400)
          .json({
            errors: "sorry a user with this email adress is already exist: ",
          });
      }

      //Create a New user
      const Salt = await bcrypt.genSalt(10);
      const Secpswd = await bcrypt.hash(req.body.password, Salt);

      // Create a new user

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: Secpswd,
      });
      // .then(user => res.json(user)).catch(err=>{console.log(err);

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = JWT.sign(data, JWT_SECRET);
      success = true;
      // res.json(user)
      res.send({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("interval server error occured", error.message);
    }
  }
);
//  2. Authenticating a user using POST: "/api/auth/login". NO login required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a password").exists(),
  ],
  async (req, res) => {
    // if there are errors return bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        res
          .status(404)
          .json({ errors: "Please login with correct credential" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ errors: "Please try to login with correct credential" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = JWT.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error occured");
    }
  }
);

// Route 3: get logged in user details using: Post "api/auth/getuser" login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error occured");
  }
});

module.exports = router;
