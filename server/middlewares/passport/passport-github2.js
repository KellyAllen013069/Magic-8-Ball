import passport from "passport";
import GitHubStrategy from 'passport-github2';
import userFunctions from "../../controllers/users.controller.js";
import dotenv from "dotenv";


passport.serializeUser((user,done)=> {
    done(null,user.id)
})

 passport.deserializeUser((id,done)=> {
    userFunctions.findUserById(id).then((user) => {
        done(null, user);
    }).catch(err => console.log(err))

});


const gitHubStrategy =   new GitHubStrategy({
        //options for strategy
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/api/authgithub/redirect`,
   
}, (accessToken, refreshToken, profile, done) => {
     
     //add user to db if not there
     userFunctions.findGitHubUser(profile.id)
     .then(userData => {
          if (!userData || userData == "") {
            let name = profile.displayName;
            let emailAddress = "";
            let password = "";
            let authType = 'github';
            let authID = profile.id;
            let thumbnail = profile.photos[0].value;
            let newUser = {name,emailAddress,password,authType,authID,thumbnail};
            userFunctions.addUser(newUser)
               .then(userData => {

                    userFunctions.findGitHubUser(userData.insertId)
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

passport.use(gitHubStrategy);

export default gitHubStrategy
