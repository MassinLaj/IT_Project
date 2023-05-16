import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import * as mongoose from 'mongoose'
import path from 'path'
import bcrypt from 'bcrypt';

const app = express();
const port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.set("port", 3000);
app.set('views', path.join(__dirname, '..', 'views'))

app.set("view engine", "ejs");


//database login/register start
const loginSchema = new mongoose.Schema({
    name: String,
    email: String,
    password1: String,
    password2: String
  });
  
  mongoose.model('login', loginSchema);



mongoose.connect('mongodb+srv://oogwavy:Internationaal_95@database.n6kinc2.mongodb.net/Internationaal', {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 5000,
    dbName: 'Internationaal'
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error in Connecting to Database: ', error);
});


//register start
app.get("/register", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    res.render("register");
});

app.post("/register", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password1 = req.body.password1;
    const password2 = req.body.password2;

    if (password1 !== password2) {
        // Passwords do not match
        res.render("register", { error: "Passwords do not match" }); // Render the registration page with an error message
        return;
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password1, saltRounds);

        const data = {
            "name": name,
            "email": email,
            "password1": hashedPassword
        }

        const LoginModel = mongoose.model('login');
        const result = await LoginModel.create(data);

        console.log("Record Inserted Successfully");
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render("register", { error: "An error occurred during registration" }); // Render the registration page with an error message
    }
});

//register end



//login start
app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const LoginModel = mongoose.model('login');
        const user = await LoginModel.findOne({ email: email });

        if (!user) {
            // User not found
            console.log("Invalid email or password");
            res.render("login", { error: "Invalid email or password", email: '' }); // Render the login page with an error message and cleared email field
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password1);

        if (!passwordMatch) {
            // Password doesn't match
            console.log("Invalid email or password");
            res.render("login", { error: "Invalid email or password", email: '' }); // Render the login page with an error message and cleared email field
            return;
        }

        console.log("Login successful");
        // Perform any other necessary actions for a successful login

        res.redirect('/'); // Redirect the user to the desired page after successful login
    } catch (err) {
        console.error(err);
        res.redirect('/login'); // Redirect the user back to the login page or show an error message
    }
});

//login end
//database login/register end



//start landing
app.get('/', (_req: Request, res: Response) => {
    res.render('landingpage')
})
//end landing


//contact start
app.get("/contact", (_req: Request, res: Response) => {
    res.render('contact');
});

app.post("/contact", (req, res) => {

    console.log(req.body);

});
//contact end


//about start
app.get("/about", (_req: Request, res: Response) => {
    res.render('about');
});

//about end


//quiz_selection start
app.get("/quiz_selection", (_req: Request, res: Response) => {
    res.render('quiz_selection');
});

//quiz_selection end


//10_round start
app.get("/10_round", (_req: Request, res: Response) => {
    res.render('10_round');
});

//10_round end


//10_round_endscore start
app.get("/10_round_endscore", (_req: Request, res: Response) => {
    res.render('10_round_endscore');
});

//10_round_endscore end


//sudden_death start
app.use(express.static(path.join(__dirname, 'views/js')));

app.get("/sudden_death", (_req: Request, res: Response) => {
    res.render('sudden_death', {
    })
});
//sudden_death end


//suddendeath_endscore start
app.get("/suddendeath_endscore", (_req: Request, res: Response) => {
    res.render('suddendeath_endscore');
});

//suddendeath_endscore end


//whitelist start
app.get("/whitelist", (_req: Request, res: Response) => {
    res.render('whitelist');
});

//whitelist end


//blacklist start
app.get("/blacklist", (_req: Request, res: Response) => {
    res.render('blacklist');
});

//blacklist end


app.listen(port, () => {
    console.log("Listening on PORT 8080}");
});
