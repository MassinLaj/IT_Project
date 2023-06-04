import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import path from 'path';
import bcrypt from 'bcrypt';
import session, { SessionData } from 'express-session';


declare module 'express-session' {
    interface SessionData {
      loggedIn?: boolean;
      user?: CustomSessionUser;
    }
  }
  
  interface CustomSessionUser {
    name?: string;
    loggedIn?: boolean;
    email?: string;
    password1?: string;
    password2?: string;

    // Add other properties if necessary
  }
  
  
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.set('port', 3000);
app.set('views', path.join(__dirname, '..', 'views'));

app.set('view engine', 'ejs');

// Database login/register start
const loginSchema = new mongoose.Schema({
    name: String,
    email: String,
    password1: String,
    password2: String,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorites' }], // so a person can have multiple favorites character quotes

});

const LoginModel = mongoose.model('login', loginSchema);

mongoose
    .connect('mongodb+srv://oogwavy:Internationaal_95@database.n6kinc2.mongodb.net/Internationaal', {
        connectTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        serverSelectionTimeoutMS: 5000,
        dbName: 'Internationaal',
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error in Connecting to Database: ', error);
    });

// Configure session
app.use(
    session({
        secret: 'k|*.FGu7,R@aBV0WL(y;Xg&dj*L$i7jc&>+q!befp4xh-!2lC9#`M&aT84]oxGq',
        resave: false,
        saveUninitialized: false,
    })
);

// Register start
app.get('/register', (_req: Request, res: Response) => {
    res.set({
        'Allow-access-Allow-Origin': '*',
    });
    res.render('register', { user: _req.session.user });
});


app.post('/register', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password1 = req.body.password1;
    const password2 = req.body.password2;

    if (password1 !== password2) {
        // Passwords do not match
        res.render('register', { error: 'Passwords do not match' }); // Render the registration page with an error message
        return;
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password1, saltRounds);

        const data = {
            name: name,
            email: email,
            password1: hashedPassword,
        };

        const LoginModel = mongoose.model('login');
        const result = await LoginModel.create(data);

        console.log('Record Inserted Successfully');
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('register', { error: 'An error occurred during registration' }); // Render the registration page with an error message
    }
});

// Register end

// Login start
app.get('/login', (_req: Request, res: Response) => {
    res.render('login', { user: _req.session.user });
});

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const LoginModel = mongoose.model('login');
        const user = await LoginModel.findOne({ email: email });
        if (!user) {
            // User not found
            console.log('Invalid email or password');
            res.render('login', { error: 'Invalid email or password', email: '' }); // Render the login page with an error message and cleared email field
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password1);

        if (!passwordMatch) {
            // Password doesn't match
            console.log('Invalid email or password');
            res.render('login', { error: 'Invalid email or password', email: '' }); // Render the login page with an error message and cleared email field
            return;
        }

        // Initialize user object if it doesn't exist
        req.session.user = {
            name: user.name,
            loggedIn: true,
            email: user.email,
    
            
        };

        // Update the session object with loggedIn and user properties
        req.session.loggedIn = true;
        req.session.user.loggedIn = true; // Set loggedIn property to true

        console.log('Login successful');
        // Perform any other necessary actions for a successful login

        res.redirect('/'); // Redirect the user to the desired page after successful login
    } catch (err) {
        console.error(err);
        res.redirect('/login'); // Redirect the user back to the login page or show an error message
    }
});
// Login end

// Logout
app.get('/logout', (req, res) => {
    // Destroy the session to remove all session data
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            console.log('Logout successful');
        }
        res.redirect('/'); // Redirect the user to the desired page after logout
    });
});

// Database login/register end

// Start landing
app.get('/', (req, res) => {
    res.render('landingpage', { user: req.session.user });
});
// End landing

// Contact start

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const ContactModel = mongoose.model('Contact', contactSchema, 'contact');
app.get('/contact', (_req: Request, res: Response) => {
    res.render('contact', { user: _req.session.user });
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Create a new document using the ContactModel
    const contact = new ContactModel({
        name: name,
        email: email,
        message: message,
    });

    // Save the document to MongoDB
    contact.save()
        .then(() => {
            console.log('Contact message saved successfully');
            res.redirect('/'); // Redirect to the homepage or another page after saving
        })
        .catch((error) => {
            console.error('Error saving contact message:', error);
            res.redirect('/contact'); // Redirect back to the contact page or show an error message
        });
});
// Contact end

// About start
app.get('/about', (_req: Request, res: Response) => {
    res.render('about', { user: _req.session.user });
});
// About end

// Quiz selection start
app.get('/quiz_selection', (_req: Request, res: Response) => {
    res.render('quiz_selection', { user: _req.session.user });
});
// Quiz selection end

// 10_round start
app.get('/10_round', (_req: Request, res: Response) => {
    res.render('10_round', { user: _req.session.user });
});
// 10_round end

// 10_round_endscore start
app.get('/10_round_endscore', (_req: Request, res: Response) => {
    res.render('10_round_endscore', { user: _req.session.user });
});
// 10_round_endscore end

// Sudden death start
app.use(express.static(path.join(__dirname, 'views/js')));

app.get('/sudden_death', (_req: Request, res: Response) => {
    res.render('sudden_death', { user: _req.session.user });
});
// Sudden death end

// Sudden death end score start
app.get('/suddendeath_endscore', (_req: Request, res: Response) => {
    res.render('suddendeath_endscore');
});
// Sudden death end score end

// Middleware to check if user is logged in
const checkLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.loggedIn) {
      // User is logged in, proceed to the next middleware or route handler
      next();
    } else {
      // User is not logged in, redirect to the login page or show an error message
      res.redirect('/login'); // Assuming you have a login page at '/login'
    }

  };

  // Definieer een schema voor de opgeslagen personages
const  favoritesSchema = new mongoose.Schema({
    name: String,
    quote: String,
  });
  
  // Definieer een model op basis van het schema
const Favorites = mongoose.model('Favorites', favoritesSchema);

//voor het verwijderen van quotes

app.post('/remove-quote', checkLoggedIn, async (req, res) => {
    // Retrieve the quote to be removed from the request body
    const { quoteIndex } = req.body;
    
    // Check if req.session.user is defined, otherwise provide a default value
    const username = req.session.user?.name ?? ''; //maar  name is niet uniek 
  
    // Find the user by their ID and populate the favorites field
    const user = await LoginModel.findById(username).populate('favorites');

    if (!user) {
      throw new Error('User not found');
    }

    // Extract the favorites from the user object
    const favorites = user.favorites;
  
    // Remove the quote from the favorites list based on the index
    if (Array.isArray(favorites) && favorites.length > quoteIndex) {
        favorites.splice(quoteIndex, 1); }
    
    // Redirect back to the whitelist page
    res.redirect('/whitelist');
  });

  //einde verwijderen van quotes

// Whitelist start

// Whitelist route with the checkLoggedIn middleware
app.get('/whitelist', checkLoggedIn, async (req: Request, res: Response) => {
    try {
      // Check if req.session.user is defined, otherwise provide a default value
      const username = req.session.user?.name ?? '';
    
      // Find the user by their name and populate the favorites field
      const user = await LoginModel.findOne({ name: username }).populate('favorites');
    
      if (!user) {
        throw new Error('User not found');
      }
    
      // Extract the favorites from the user object
      const favorites = user.favorites;
    
      // Pass the favorites to the view
      res.render('whitelist', { user: req.session.user, favorites: favorites });
    } catch (error: any) {
      console.error('Error retrieving favorites:', error.message);
      res.status(500).send('Error retrieving favorites');
    }
  });
  

// Whitelist end

app.get('/download-quotes', checkLoggedIn, async (req, res) => {
    // Check if req.session.user is defined, otherwise provide a default value
    const username = req.session.user?.name ?? ''; //maar  name is niet uniek 
  
    // Find the user by their ID and populate the favorites field
    const user = await LoginModel.find({ name: username }, (err: any, docs: any) => {
        if (err) {
          console.error(err);
          return;
        }

    if (!user) {
      throw new Error('User not found');
    }

    // Extract the favorites from the user object
    const favorites = docs.map((doc: { favorites: any; })=> doc.favorites);

    if (!favorites || favorites.length === 0) {
      // If no favorite quotes are found, redirect or display an error message
      res.redirect('/whitelist');
      return;
    }
  
    // Generate the content for the text file
    const content = favorites.map((favorite: any) => {
    //  return `${favorite.name}: ${favorite.quote}`;  HIER IS EEN FOUT!
    }).join('\n');
  
    // Set the response headers to indicate a text file download
    res.setHeader('Content-disposition', 'attachment; filename=quotes.txt');
    res.setHeader('Content-type', 'text/plain');
    
    // Send the content as the response
    res.send(content);
  }) });
  

// Blacklist start
app.get('/blacklist', (_req: Request, res: Response) => {
    res.render('blacklist', { user: _req.session.user });
});
// Blacklist end

app.listen(port, () => {
    console.log('Listening on PORT 8080');
});

