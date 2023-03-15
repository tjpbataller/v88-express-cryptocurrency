let express = require("express");
let app = express();
let port = 8000;
let bodyParser = require("body-parser");
let session = require("express-session");
let submitted = false;
let coupon;
let discount = "50% Discount";

/* Setup folder structure */
app.set("views",__dirname+"/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname));
/* Use body parser */
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

app.get("/",function(req,res)
{
    if(typeof req.session.counter === "undefined")
    {   
        req.session.counter = 10;
    }
    res.render("index", {
        submitted: submitted,
        coupon: coupon,
        counter: req.session.counter,
        discount: discount
    });
});
app.post("/claim",function(req,res)
{
    if(req.session.counter === 0)
    {
        submitted = true;
        discount = "Sorry!";
        coupon = "Unavailable";
        res.redirect("/");
        return;
    }
    coupon = Math.abs(Math.floor(Math.random() * (1234567 - 9999987 + 1) + 1234567));
    submitted = true;
    req.session.counter = req.session.counter - 1;
    res.redirect("/");
});
app.post("/again",function(req,res)
{
    submitted = false;
    res.redirect("/");
})
app.post("/reset",function(req,res)
{   
    discount = "50% Discount";
    req.session.counter = 10;
    submitted = false;
    res.redirect("/");
});
app.listen(port);