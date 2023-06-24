const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));
app.get('/',(req,res)=>{
    // res.send('server is working');
    res.sendFile(__dirname + "/index.html")

})

app.post('/',(req,res)=>{
 var Fname = req.body.Fname;
 
 var Lname = req.body.Lname;
 
 var Email = req.body.Email;
 
 var data ={
    members : [{
       email_address :Email ,
       status:"subscribed",
       merge_fields:{
        FNAME:Fname,
        LNAME : Lname
       }
    }]
 }
const jsonData = JSON.stringify(data);
//  console.log(Fname,Lname,Email);
const url ='https://us21.api.mailchimp.com/3.0/lists/97bdf34423';
const options = {
    method : "POST",
    auth : "Naresh:b52d3b083a55a42b22f2af56835f18f5-us21"
}
const request = https.request(url,options ,function(response){
    if(response.statusCode ===200)
    {
        res.sendFile(__dirname + '/sucess.html')
    }
    else{
        res.sendFile(__dirname + '/failure.html')
    }
  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})
request.write(jsonData);
request.end();

})

app.post("/failure",(req,res)=>{
    res.redirect('/');
}
)

app.listen(process.env.PORT || 3000,()=>{
    console.log('server is running on port 3000')
})
// api key
// b52d3b083a55a42b22f2af56835f18f5-us21
// list id
// 97bdf34423