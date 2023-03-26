import express from 'express';
import passport from "passport";
import bcrypt from 'bcryptjs';
import localStrategy from '../middlewares/passport/passport-local.js';
import userFunctions from '../controllers/users.controller.js';


const encryptPassword = (password) => {
  try {
      const salt = bcrypt.genSaltSync(10);
      let data = bcrypt.hashSync(password, salt);
      return data;
  }
  catch (err) {
      console.error(err)
  }
}

const authLocalRouter = express.Router();

passport.use(localStrategy)


authLocalRouter.post('/login', passport.authenticate('local', {
  failureFlash: true,
  failureRedirect:'http://localhost:5001/api/authlocal/login-failure'}), (req, res) => {
  res.redirect('http://localhost:5001/api/authlocal/login-success');
});


authLocalRouter.post("/register", async (req, res, next) => {
    try {
      let {name, emailAddress, password} = req.body;
      

      let found = await userFunctions.findUserByEmail(emailAddress);
      if (found[0]) {
        res.json({
          success: false,
          message: 'User already exists'
        })
        return;
      }

     
      let hashed  = encryptPassword(password);
      password = hashed;
      let authType = "local";
      let authID = "";
      let thumbnail = "";
      let user = {name,emailAddress,password,authType,authID,thumbnail};
      let data = await userFunctions.addUser(user);
      res.json({
        success: true,
        message: 'User successfully registered',
        user: data
      });
    } catch (err) {
      next(err)
    }
  });



authLocalRouter.get("/login-success", (req,res) => {
    //res.send("SUCCESS");
    res.status(200).json({
      success: "true",
      message: "Login successful!"
    })
    //res.redirect('http://localhost:3000/')
})

authLocalRouter.get("/login-failure", (req, res) => {
    let errMsg = req.flash('error')[0];
    res.status(200).json({
      success: "false",
      message: `Authentication failed. ${errMsg}`
    })
})

export default authLocalRouter;