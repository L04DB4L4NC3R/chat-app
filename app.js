const express = require("express");
const bp = require("body-parser");

const app = express();

//templating language used: ejs
app.set("view engine","ejs");

//post routes middleware
app.use(bp.json());
app.use(bp.urlencoded({extended:false}));

//static files middleware
app.use(express.static('public'));

app.get("/",(req,res)=>{
    res.render('index');
});

console.log("listening on port 3000");
const server = app.listen(process.env.PORT || 3000 );
