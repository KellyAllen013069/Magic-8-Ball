import express from 'express';
import passport from "passport";
import googleStrategy from '../middlewares/passport/passport-google.js';


const authGoogleRouter = express.Router();

passport.use(googleStrategy);

authGoogleRouter.get("/login/success", (req,res) => {
    //res.set('Access-Control-Allow-Origin', "http://localhost:3000")
    console.log("In get user is " + req.user)
    //console.log("request IS " + JSON.stringify(req))
    console.log("JUST BEFORE RETURN request user is " + req.user); 
    if(req.user) {
        console.log("*****************USER THERE*****************");
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
           
        })
    }
    
})

authGoogleRouter.get("/login/failure", (req,res) => {
        res.status(401).json({
            success: false,
            message: "failure",
            user: req.user,
        });

});

 authGoogleRouter.get("/login", passport.authenticate('google', {
    scope: ['profile']
}));

authGoogleRouter.get("/redirect", passport.authenticate('google',{
    successRedirect: "http://localhost:3000",
    failureRedirct: "http://localhost:3000/login"
}), (req,res) => {
   
    res.send(req.user)
});


export default authGoogleRouter;