let express = require("express");
let app = express();
let port = 8000;
let start = 0;
let end = 9;
let bodyParser = require("body-parser");
let session = require("express-session");
let axios = require("axios");

/* 
LINKS
crypto
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=1 

exchanges
https://api.coingecko.com/api/v3/exchanges?per_page=10&page=1

finance
https://api.coingecko.com/api/v3/asset_platforms
*/

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
let page = 1;
app.get("/data",function(req, res){
    let per_page = 10;
    if(req.query.action == "next")
    {
        page++;
        if(req.query.type == "finance")
        {
            start += 10;
            end += 10;
        }
    }
    else if(req.query.action == "prev")
    {
        if(page > 0)
        {
            page--;
        }
        if(req.query.type == "finance")
        {
            if(start > 0)
            {
                start -= 10;
                end -= 10;
            }
        }
    }
    else if(req.query.action == "top")
    {
        page = 1;
        per_page = 100;
        if(req.query.type == "finance")
        {
            start = 0;
            end = 100;
        }
    }
    else
    {
        start = 0;
        end = 9;
        page = 1;
        per_page = 10;
    }
    let categories = {
        finance: "https://api.coingecko.com/api/v3/asset_platforms",
        crypto: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${per_page}&page=${page}`,
        exchange: `https://api.coingecko.com/api/v3/exchanges?per_page=${per_page}&page=${page}`
    }
    let url = categories[req.query.type];
    axios.get(url)
    .then(function(data){
        let response = "";
        if(req.query.type == "finance")
        {
            for(let x=start; x<end; x++)
            {
                response += `<p class="fs-3">${data.data[x].name}</p>`;
            }
            res.send(response);
            return;
        }
        for(let x=0; x<data.data.length; x++)
        {
            response += `<p class="fs-3">${data.data[x].name}</p>`;
        }
        res.send(response);
    })
    .catch(err=>{
        console.log(err);
        res.json(err);
    })
})
app.listen(port);