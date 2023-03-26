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
    userFunctions.findLocalUserByEmail(email)
        .then((user) => {
            if(!user[0]) return done(null,false, {message: 'User not found.'})
            const isValid = bcrypt.compareSync(password, user[0].Password);
            if(!isValid) return done(null, false, {message: 'Incorrect password.'})
            return done(null, user[0])

        })
        .catch (err => {
            done(err)
        })
}

const localStrategy = new LocalStrategy(customFields, verifyCallback);

passport.use(localStrategy);

passport.serializeUser((user, done) => {
    
    done(null, user.id);
})
passport.deserializeUser((userId, done) => {
    
    userFunctions.findUserById(userId)
    .then ((user) => {
        done(null,user);
    
    })
    .catch(err => done(err))

})

export default localStrategy