const express = require("express");
const bp = require("body-parser");
const passport = require('passport');
const morgan = require('morgan');
const socket = require("./helpers/socket");
const session = require("express-session");
require("dotenv").config();
require("./db/connect");
require("./helpers/oauth_config");

const app = express();
app.use(morgan('dev'));

//templating language used: ejs
app.set("view engine","ejs");

//session
app.use(session({
    secret:process.env.SECRET_KEY,
    saveUninitialized:false,
    resave:false
}));

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

console.log("listening...");
const server = app.listen(process.env.PORT || 3000 );
socket(server);
