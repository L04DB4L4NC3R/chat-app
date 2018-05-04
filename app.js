const express = require("express");
const bp = require("body-parser");
require("./db/connect");

const app = express();

//templating language used: ejs
app.set("view engine","ejs");

//post routes middleware
app.use(bp.json());
app.use(bp.urlencoded({extended:false}));

//static files middleware
app.use(express.static('public'));

//including routes
app.use(require("./routes/login"));

console.log("listening on port 3000");
const server = app.listen(process.env.PORT || 3000 );
