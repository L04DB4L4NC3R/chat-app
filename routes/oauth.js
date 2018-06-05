const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));


router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    if(req.user){
        jwt.sign({user:req.user},process.env.SECRET_KEY,{expiresIn:'2d'},(err,token)=>{
            if(err)
                res.send(err);

            req.session.name = req.user.name;
            res.render("chatting",{token:token,name:req.session.name} );
        });
    }
    else
        res.send("error in oauth.js line 10 to 20");
});

router.get("/logout",(req,res)=>{
    req.logout();
    req.session.name="";
    res.redirect('/');
});


//facebook oauth

router.get('/facebook',passport.authenticate('facebook',{
    scope: ['publish_actions']
}));


router.get('/facebook/redirect',passport.authenticate('facebook'),(req,res)=>{
    if(req.user){
        jwt.sign({user:req.user},process.env.SECRET_KEY,{expiresIn:'2d'},(err,token)=>{
            if(err)
                res.send(err);

            req.session.name = req.user.name;
            res.render("chatting",{token:token,name:req.session.name});
        });
    }
    else
        res.send("error in oauth.js");
});



module.exports = router;
