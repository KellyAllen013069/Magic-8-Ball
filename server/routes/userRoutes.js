import express from 'express';

const userRouter = express.Router();

userRouter.get('/getUser', (req, res) => {
    if(req.user) {
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
  console.log("**********************************IN LOGOUT******************************");
    req.session.destroy();
    console.log("***after session destroy*****");
    req.logOut();
    console.log("******after logout********");
    res.clearCookie('connect.sid');
    console.log("***********after clearing cookie*********");
    res.status(200).json({
      success: true,
      message: "logout successfull"
    })
    console.log("********sent msg to client");
   
  });

export default userRouter