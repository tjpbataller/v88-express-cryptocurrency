let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.set("views",__dirname+"/views");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res)
{
    res.render("form");
})
app.post("/result",function(req,res)
{
    res.render("result", {data: req.body});
})
app.listen(8000,function()
{
    console.log("listening to port 8000");
});