var express = require("express");
var app = express();

app.set("view engine", "ejs");


app.get("/", function(req, res){
   
    res.send("<h1>Hello World </h1>");
    
});


app.get("*", function(req, res){
    res.send("<h1>Invalid Page </h1>");
})


if(process.env.NODE_ENV === 'production'){

}
// server listening on port 3000
PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log("Server started on port 3000");
});
