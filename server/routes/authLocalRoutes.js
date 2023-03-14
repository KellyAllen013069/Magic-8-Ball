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

/* authLocalRouter.post('/login', (req, res, next) => {
    console.log("before passport.authenticate");
    passport.authenticate('local', (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          console.log(info.message); // Log the error message
          res.redirect('/login');
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.redirect('/'); // Redirect to success page
        });
      })(req, res, next);
  }); */
  

//authLocalRouter.post('/login', passport.authenticate('local', {failureRedirect:'http://localhost:5001/api/authlocal/login-failure', successRedirect: 'http://localhost:5001/api/authlocal/login-success'}));

authLocalRouter.post('/login', passport.authenticate('local', {
  failureFlash: true,
  failureRedirect:'http://localhost:5001/api/authlocal/login-failure'}), (req, res) => {
  res.redirect('http://localhost:5001/api/authlocal/login-success');
});


authLocalRouter.post("/register", async (req, res, next) => {
    try {

      console.log("req body is " + [req.body])
      let {name, emailAddress, password} = req.body;
      
      console.log("name is " + name);
      console.log("emailaddress is " + emailAddress);
      console.log("before setting password");
      console.log("rawPassword is " + password)
      let hashed  = encryptPassword(password);
      password = hashed;
      console.log("password is " + hashed);
      let authType = "local";
      let authID = "";
      let thumbnail = "";
      let user = {name,emailAddress,password,authType,authID,thumbnail};
      console.log("user is " + user) ;
      let data = await userFunctions.addUser(user);
      res.json(data);
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
    console.log("login failure getting -----------")
    console.dir(res)
    //res.redirect("http://localhost:3000/login");
    let errMsg = req.flash('error')[0];
    res.status(200).json({
      success: "false",
      message: `Authentication failed. ${errMsg}`
    })
})

export default authLocalRouter;