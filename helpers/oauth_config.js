const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const users = require("../db/model");
const hash = require('./hash').hash
const FacebookStrategy = require("passport-facebook");


passport.serializeUser((user,done)=>done(null,user.name));

passport.deserializeUser((name,done)=>{
    users.findOne({name:name})
    .then((u)=>{
        done(null,u);
    }).catch(console.log);
})



passport.use(
    new GoogleStrategy({
        clientID:process.env.GCLIENT_ID,
        clientSecret:process.env.GCLIENT_SECRET,
        callbackURL:process.env.GCALLBACK_URL
    }, function(accessToken,refreshToken,profile,done){

            users.findOne({name:profile.id})
            .then((user)=>{
                if(user){
                    console.log("user exists");
                    done(null,user);
                }

                else{
                    hash(profile.id)
                    .then((p)=>{
                        new users({
                            name:profile.displayName,
                            passwd:p,
                            chats:[]
                        }).save()
                        .then((u)=>{
                            console.log("creating new user");
                            done(null,u);
                        }).catch(console.log);
                    }).catch(console.log);
                }

            })

    })
)




//facebook oauth
passport.use(new FacebookStrategy({
    clientID:process.env.FCLIENT_ID,
    clientSecret:process.env.FCLIENT_SECRET,
    callbackURL:process.env.FCALLBACK_URL
},function(accessToken,refreshToken,profile,done){

    users.findOne({name:profile.id})
    .then((u)=>{
        if(u){
            console.log("user exists");
            done(null,u);
        }
        else{
            hash(profile.id)
            .then((p)=>{
                new users({
                    name:profile.displayName,
                    passwd:p
                }).save().then((us)=>{
                    console.log("created new user");
                    done(null,us);
                }).catch(console.log);
            }).catch(console.log);
        }
    }).catch(console.log);

}));
