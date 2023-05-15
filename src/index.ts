import express, { Request, Response } from 'express'

const app = express();
const port = process.env.PORT || 8080

app.use(express.urlencoded({extended: true}));
app.use('/public', express.static('public'));

app.set("port", 3000);
app.set("view engine", "ejs");

//start landing
app.get('/', (_req: Request, res: Response) => {
    return res.send('Express Typescript on Vercel')
  })

  app.get('/ping', (_req: Request, res: Response) => {
    return res.send('pong 🏓')
  })
//end landing


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

app.listen(port, () => {
    return console.log(`Server is listening on ${port}`)
  })