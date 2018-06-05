const jwt = require("jsonwebtoken");

module.exports = function verify(req,res,next){
    console.log(req.headers.Authorization);
    jwt.verify(req.get('Authorization'),process.env.SECRET_KEY,(err,decodedData)=>{
        if(err)
            res.send(err);
        else{
            req.data = decodedData;
            next();
        }
    });
}
