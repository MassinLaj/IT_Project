import express, { Request, Response } from 'express'

const path = require('path');
const app = express();
const port = process.env.PORT || 8080

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.set("port", 3000);
app.set('views', path.join(__dirname, '..', 'views'))

app.set("view engine", "ejs");

//start landing
app.get('/', (_req: Request, res: Response) => {
    res.render('landingpage')
  })
//end landing


//contact start
app.get("/contact", (_req: Request, res: Response) =>{
    res.render('contact');
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

//about start
app.get("/about", (_req: Request, res: Response) =>{
    res.render('about');
});

//about end

//quiz_selection start
app.get("/quiz_selection", (_req: Request, res: Response) =>{
    res.render('quiz_selection');
});

//quiz_selection end


//10_round start
app.get("/10_round", (_req: Request, res: Response) =>{
    res.render('10_round');
});

//10_round end

//10_round_endscore start
app.get("/10_round_endscore", (_req: Request, res: Response) =>{
    res.render('10_round_endscore');
});

//10_round_endscore end

app.listen(port, () => {
    return console.log(`Server is listening on ${port}`)
  })