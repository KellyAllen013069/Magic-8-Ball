
import passport from "passport";
import GoogleStrategy from 'passport-google-oauth20';
import userFunctions from "../../controllers//users.controller.js";
import dotenv from "dotenv";

passport.serializeUser((user,done)=> {
    done(null,user.id)
})

 passport.deserializeUser((id,done)=> {
    userFunctions.findUserById(id)
    .then((user) => {
        done(null, user);
    }).catch(err => console.error(err))

});


const googleStrategy =   new GoogleStrategy({
        //options for strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/api/authgoogle/redirect`,
   
}, (accessToken, refreshToken, profile, done) => {
     
     //add use to db if not there
     //dont want to put queries here, so call something
     userFunctions.findGoogleUser(profile.id)
     .then(userData => {
          if (!userData || userData == "") {
            let name = profile.displayName;
            let emailAddress = "";
            let password = "";
            let authType = 'google';
            let authID = profile.id;
            let thumbnail = profile.photos[0].value;
            let newUser = {name,emailAddress,password,authType,authID,thumbnail};
            userFunctions.addUser(newUser)
               .then(userData => {
                    userFunctions.findUserById(userData.insertId)
                    .then(user => done(null, user[0]))
                    .catch(err=>console.error(err))
                })
                .catch(err => {
                    console.error(err)
                })
          }  
          else {
            done(null, userData[0]);
          }
     }) 
     .catch(err => {
        console.error(err)
     })
})

passport.use(googleStrategy);

export default googleStrategy
