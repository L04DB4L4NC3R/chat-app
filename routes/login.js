const router = require("express").Router();
const users = require("../db/model");
const jwt = require("jsonwebtoken");
const hash = require("../helpers/hash").hash;
const compare = require("../helpers/hash").compare;

router.get("/",(req,res)=>{
    res.render('index',{message:""});
});



router.post("/", async (req,res)=>{

    var user = await users.findOne({name:req.body.name});

    //signup
    if(req.body.confirm){

            if(user){
                res.render("index",{message:"User already exists"})
            }

            else{
                hash(req.body.passwd)
                .then((h)=>{

                    var obj = new users({
                        name:req.body.name,
                        passwd:h,
                        chats:[]
                    });

                    obj.save()
                    .then((o)=>{
                        jwt.sign({user:o},process.env.SECRET_KEY,{expiresIn:"2d"},(err,token)=>{
                            if(err)
                                res.send(err)
                            req.session.name = o.name;
                            res.render("chatting",{token:token,name:req.session.name});
                        });
                    })
                    .catch(console.log);

                }).catch(console.log);


            }

        }

        //login
        else{
                compare(req.body.passwd,user.passwd)
                .then((bool)=>{
                    if(user && bool )
                        {
                            jwt.sign({user},process.env.SECRET_KEY,(err,token)=>{
                                if(err)
                                    res.send(err)
                                req.session.name = user.name;
                                res.render("chatting",{token:token,name:req.session.name});
                            })
                        }
                    else
                        res.render("index",{message:"name or password entered is wrong, please try again"});
                }).catch(console.log);

        }
    });




module.exports = router;
