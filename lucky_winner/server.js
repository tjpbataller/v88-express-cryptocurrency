let express = require("express");
let app = express();
let port = 8000;
let bodyParser = require("body-parser");
let session = require("express-session");

/* Setup folder structure */
app.set("views",__dirname+"/views");
app.set("view engine", "ejs");
/* Use body parser */
app.use(bodyParser.urlencoded({extended: true}))

app.listen(port);