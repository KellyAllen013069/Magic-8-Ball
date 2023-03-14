//find existing users

import passport from "passport";
import bcrypt from 'bcryptjs'
import {Strategy as LocalStrategy} from 'passport-local';
import userFunctions from "../../controllers/users.controller.js";

const customFields =  {
    usernameField: 'email',
    passwordField: 'password'
};


const verifyCallback = (email, password, done) => {
    console.log("********************in verify callback*****************")
    userFunctions.findLocalUserByEmail(email)
        .then((user) => {
            console.log("user is " + JSON.stringify(user[0]))
            if(!user[0]) return done(null,false, {message: 'User not found.'})
            console.log("USER PASS IS " + user[0].Password);
            const isValid = bcrypt.compareSync(password, user[0].Password);
            if(!isValid) return done(null, false, {message: 'Incorrect password.'})
            console.log("returning " + user[0]);
            return done(null, user[0])

        })
        .catch (err => {
            done(err)
        })
}

const localStrategy = new LocalStrategy(customFields, verifyCallback);

passport.use(localStrategy);

passport.serializeUser((user, done) => {
    console.log("***********************serializing user")
    console.log("user is " + JSON.stringify(user))
    done(null, user.id);
})
passport.deserializeUser((userId, done) => {
    console.log("********* in deserialize*********")
    userFunctions.findUserById(userId)
    .then ((user) => {
        console.log("*********in deserializeUser user is " + JSON.stringify(user))
        done(null,user);
    
    })
    .catch(err => done(err))

})

export default localStrategy