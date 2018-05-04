const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const secret = require('../secret');

router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));


router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    if(req.user){
        jwt.sign({user:req.user},secret.secretKey,{expiresIn:'2d'},(err,token)=>{
            if(err)
                res.send(err);
            //res.send(token);
            res.send(token);
        });
    }
    else
        res.send("error in oauth.js line 10 to 20");
});

router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect('/');
});

module.exports = router;
