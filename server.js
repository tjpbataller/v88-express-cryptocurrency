let express = require("express");
let app = express();
let port = 8000;
let bodyParser = require("body-parser");
let session = require("express-session");

/* Setup folder structure */
app.set("views",__dirname+"/views");
/* setup view engine */
app.set("view engine", "ejs");
app.use(express.static(__dirname));
/* setup body parser */
app.use(bodyParser.urlencoded({extended: true}))
/* setup session */
app.use(session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.listen(port);