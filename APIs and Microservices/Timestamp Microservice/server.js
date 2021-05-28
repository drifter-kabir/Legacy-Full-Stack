// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

let resObj={};
app.get("/api/:input",function(req,res){
  let input=req.params;
  var obj=input;
  //console.log(typeof obj.input);
  if(obj.input.includes('-')||obj.input.includes(' ')){
    
    resObj["unix"]=new Date(obj.input).getTime();
    resObj["utc"]=new Date(obj.input).toUTCString();
  }
  else{
    let input1=parseInt(obj.input);
    resObj["unix"]=new Date(input1).getTime();
    resObj["utc"]=new Date(input1).toUTCString();
    // resObj["unix"]=1451001600000;
    // resObj["utc"]= "Fri, 25 Dec 2015 00:00:00 GMT";
    //console.log(resObj);
    
  }

  if(!resObj["unix"] || !resObj["utc"]){
    res.json({error: 'Invalid Date'});
  }
  res.json(resObj);
});
app.get("/api",(req, res)=>{
  resObj['unix']=new Date().getTime();
  resObj['utc']=new Date().toUTCString();
  res.json(resObj);
});
