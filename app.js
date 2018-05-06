const express = require("express");
const bp = require("body-parser");
const passport = require('passport');
const morgan = require('morgan');
require("./db/connect");
require("./helpers/oauth_config");

const app = express();
app.use(morgan('dev'));

//templating language used: ejs
app.set("view engine","ejs");

//post routes middleware
app.use(bp.json());
app.use(bp.urlencoded({extended:false}));

//passport Oauth
app.use(passport.initialize());
app.use(passport.session());

//static files middleware
app.use(express.static('public'));

//including routes
app.use(require("./routes/login"));
app.use("/auth",require("./routes/oauth"));
app.use("/chat",require("./routes/chats"));

console.log("listening on port 3000");
const server = app.listen(process.env.PORT || 3000 );
