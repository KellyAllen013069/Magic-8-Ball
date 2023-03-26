import express from 'express';
import passport from "passport";
import gitHubStrategy from '../middlewares/passport/passport-github2.js';


const authGitHubRouter = express.Router();

passport.use(gitHubStrategy);

authGitHubRouter.get("/login/success", (req,res) => {
    if(req.user) {

        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
           
        })
    }
    
})

authGitHubRouter.get("/login/failure", (req,res) => {
        res.status(401).json({
            success: false,
            message: "failure",
            user: req.user,
        });

});


 authGitHubRouter.get("/login", passport.authenticate('github', {
    scope: ['profile']
}));

authGitHubRouter.get("/redirect", passport.authenticate('github',{
    successRedirect: "http://localhost:3000",
    failureRedirct: "http://localhost:3000/login"
}), (req,res) => {
   
    res.send(req.user)
});


export default authGitHubRouter;