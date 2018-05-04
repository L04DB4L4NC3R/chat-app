const jwt = require("jsonwebtoken");\
const secret = require("require");

module.exports = function verify(req,res,next){
    jwt.verify(req.get('Authorization'),secret,secretKey,(err,decodedData)=>{
        if(err)
            res.send(err);
        else
            next();
    });
}
