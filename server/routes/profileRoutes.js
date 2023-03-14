import express from 'express'


let profileRouter = express.Router();

const authCheck = (req,res,next) => {
    if(!req.user) {
        res.redirect('auth/google')
    }
    else {
        next();
    }
};

profileRouter.get('/', authCheck, (req,res) => {
    res.send(req.user)
})

export default profileRouter