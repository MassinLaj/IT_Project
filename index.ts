import express from "express"

const app = express();

app.use(express.urlencoded({extended: true}));
app.use('/public', express.static('public'));

app.set("url", "it-project-git-ejscontactloginregister-massinlaj.vercel.app");
app.set("view engine", "ejs");

//contact start
app.get("/contact", (req, res) =>{
    res.render("contact");
});

app.post("/contact", (req, res) => {

    console.log(req.body);

});
//contact end

//login start
app.get("/login", (req, res) =>{
    res.render("login");
});

app.post("/login", (req, res) => {

    console.log(req.body);

});
//login end

//register start
app.get("/register", (req, res) =>{
    res.render("register");
});

app.post("/register", (req, res) => {

    console.log(req.body);

});
//register end

app.listen(app.get("port"), () => {
    console.log(`Web app has started on ${app.get("port")}`);
});
