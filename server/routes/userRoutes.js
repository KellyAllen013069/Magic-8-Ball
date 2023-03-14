import express from 'express';

const userRouter = express.Router();

userRouter.get('/getUser', (req, res) => {
    req.isAuthenticated() ? console.log("AUTHENTICATED") : console.log("NOT AUTHENTICATED")
    console.log("GETTING TO ENDPOINT")
    //console.dir(req)
    if(req.user) {
        console.log("*****************USER THERE**********" + JSON.stringify(req.user));
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user[0]
        })
    } else (
        res.json({success: false, message: "unsuccessful"})
    )
  });

userRouter.get('/logout', (req, res, next) => {
    console.log("******TRYING TO LOG OUT")
    //console.log("******req is " + JSON.stringify(req));
    console.log("HERE?????/ " + req.user)
    req.session.destroy();
    req.logOut();
    res.clearCookie('connect.sid');
    res.json({message: "logged out"});
  });

export default userRouter