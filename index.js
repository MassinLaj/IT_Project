var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()
app.set("view engine", "ejs");
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://oogwavy:Internationaal_95@database.n6kinc2.mongodb.net/Internationaal',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/register",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password1 = req.body.password1;
    var password2 = req.body.password2;

    var data = {
        "name": name,
        "email" : email,
        "password1": password1,
        "password2" : password2
    }

    db.collection('login').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    res.redirect('/landingpage.ejs'); // Corrected the redirect path
})


app.post("/login", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
  
    // Here, you can perform authentication or any other necessary logic
  
    // You can also store the login data in the database if needed
    var data = {
      "email": email,
      "password": password
    }
  
    db.collection('login').insertOne(data, (err, collection) => {
      if (err) {
        throw err;
      }
      console.log("Login Record Inserted Successfully");
    });
  
    res.redirect('/landingpage.ejs');
  });



  app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/register", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    res.render("register.ejs");
});

app.listen(3000, () => {
    console.log("Listening on PORT 3000");
});
