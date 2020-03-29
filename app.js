var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect(process.env.MONODB_URI ||'mongodb://localhost/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose is Connected !!')
});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
//mongoose scema

var birthSchema = new mongoose.Schema({
    name:String,
  
    date:{
        type: String,
        default: Date.now()
    }
});
var Birth = mongoose.model("Birth", birthSchema);

app.get("/", function(req, res){
    Birth.find({}, function(err, birthdayList){
        if(err) console.log(err);
        else{
            res.render("index.ejs", {birthdayList: birthdayList});
        }
    })
    
});




app.post("/newtodo", function(req, res){
    console.log("item submitted");
    var newItem = new Birth ({
       name: req.body.item,
        date: req.body.item1,
     
    });
    Birth.create(newItem,function(err, Birth){
        if(err) console.log(err);
        else{
            console.log("Inserted Item: "+ newItem);
            
        }
    });
    res.redirect("/");
});

app.get('/destroy/:id', function(req, res){
    console.log("item Deleted");
    var mongodb = require('mongodb');
    var delItem ={_id: new mongodb.ObjectID(req.params.id)};
    
    Birth.deleteOne(delItem,function(err, Todo){
        if(err) console.log(err);
        else{
            console.log("Deleted Item: "+ delItem._id);
        }
    });
    res.redirect("/");
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
