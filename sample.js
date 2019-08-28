var express = require("express");
var app = express();
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/books', {useNewUrlParser: true});
// const userDB = mongoose.createConnection('mongodb://interntest:easyas123@interncluster-shard-00-00-zmzoh.mongodb.net:27017,interncluster-shard-00-02-zmzoh.mongodb.net:27017/test?ssl=true&replicaSet=InternCluster-shard-0&authSource=admin&retryWrites=true', {useNewUrlParser : true});
// userDB.once('open', function(){console.log('Connected to MongoDB Atlas.');});
//userDB.on('error', function(err){console.log('Database ERROR: ' + err);});
//mongoose.connect("mongodb+srv://myuser:myuser123@cluster0-ekp9r.mongodb.net/Sancamp?retryWrites=true");
mongoose.connect("mongodb://interntest:easyas123@interncluster-shard-00-00-zmzoh.mongodb.net:27017,interncluster-shard-00-02-zmzoh.mongodb.net:27017/test?ssl=true&replicaSet=InternCluster-shard-0&authSource=admin&retryWrites=true")
var bookSchema = new mongoose.Schema({
  name : String,
  phonenumber : String,
  email : String,
  books : {
     name : String,
     author : String,
     price : String
  }
});
var newbook = mongoose.model('newbook', bookSchema);
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get("/",function(req,res){
  res.render("landing.ejs")
});

app.get("/Upload",function(req,res) {
  res.render("Upload.ejs")
})

app.post("/Upload",function(req,res){
  var name = req.body.author.name;
  console.log(name);
  var phonenumber = req.body.author.phonenumber;
  var email = req.body.author.email;
  var books = {
     name : req.body.book.name,
     author : req.body.book.author,
     price : req.body.book.price
  };

  var data = new newbook({
    name : name,
    phonenumber : phonenumber,
    email: email,
    books : books
  });
  console.log(data);

  data.save(function(err,book){
    if(err){
      console.log("error");
    }
    else{
        res.redirect("/");
    }
  });

});

app.listen(3000,function(){
  console.log("Upload");
});
