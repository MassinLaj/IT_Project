"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose = __importStar(require("mongoose"));
var path_1 = __importDefault(require("path"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var express_session_1 = __importDefault(require("express-session"));
var app = (0, express_1.default)();
var port = process.env.PORT || 8080;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.set('port', 3000);
app.set('views', path_1.default.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
// Database login/register start
var loginSchema = new mongoose.Schema({
    name: String,
    email: String,
    password1: String,
    password2: String,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorites' }], // so a person can have multiple favorites character quotes
});
var LoginModel = mongoose.model('login', loginSchema);
mongoose
    .connect('mongodb+srv://oogwavy:Internationaal_95@database.n6kinc2.mongodb.net/Internationaal', {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 5000,
    dbName: 'Internationaal',
})
    .then(function () {
    console.log('Connected to MongoDB');
})
    .catch(function (error) {
    console.log('Error in Connecting to Database: ', error);
});
// Configure session
app.use((0, express_session_1.default)({
    secret: 'k|*.FGu7,R@aBV0WL(y;Xg&dj*L$i7jc&>+q!befp4xh-!2lC9#`M&aT84]oxGq',
    resave: false,
    saveUninitialized: false,
}));
// Register start
app.get('/register', function (_req, res) {
    res.set({
        'Allow-access-Allow-Origin': '*',
    });
    res.render('register', { user: _req.session.user });
});
app.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, email, password1, password2, saltRounds, hashedPassword, data, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name;
                email = req.body.email;
                password1 = req.body.password1;
                password2 = req.body.password2;
                if (password1 !== password2) {
                    // Passwords do not match
                    res.render('register', { error: 'Passwords do not match' }); // Render the registration page with an error message
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                saltRounds = 10;
                return [4 /*yield*/, bcrypt_1.default.hash(password1, saltRounds)];
            case 2:
                hashedPassword = _a.sent();
                data = {
                    name: name,
                    email: email,
                    password1: hashedPassword,
                };
                return [4 /*yield*/, LoginModel.create(data)];
            case 3:
                result = _a.sent();
                console.log('Record Inserted Successfully');
                res.redirect('/');
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.error(err_1);
                res.render('register', { error: 'An error occurred during registration' }); // Render the registration page with an error message
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Register end
// Login start
app.get('/login', function (_req, res) {
    res.render('login', { user: _req.session.user, error: null });
});
app.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, user, passwordMatch, error, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, LoginModel.findOne({ email: email })];
            case 2:
                user = _a.sent();
                if (!user) {
                    // User not found
                    console.log('Invalid email or password');
                    res.render('login', { error: 'Invalid email or password', email: '', user: req.session.user });
                    return [2 /*return*/];
                }
                if (!user.password1) {
                    // Password not found
                    console.log('Invalid email or password');
                    res.render('login', { error: 'Invalid email or password', email: '' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password1)];
            case 3:
                passwordMatch = _a.sent();
                if (!passwordMatch) {
                    // Password doesn't match
                    console.log('Invalid email or password');
                    error = 'Invalid email or password';
                    res.render('login', { error: error, email: '', user: req.session.user });
                    return [2 /*return*/];
                }
                // Initialize user object if it doesn't exist
                req.session.user = {
                    name: user.name,
                    loggedIn: true,
                    email: user.email,
                };
                console.log('Login successful');
                // Perform any other necessary actions for a successful login
                res.redirect('/'); // Redirect the user to the desired page after successful login
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                console.error(err_2);
                res.redirect('/login'); // Redirect the user back to the login page or show an error message
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Login end
// Logout
app.get('/logout', function (req, res) {
    // Destroy the session to remove all session data
    req.session.destroy(function (err) {
        if (err) {
            console.error('Error destroying session:', err);
        }
        else {
            console.log('Logout successful');
        }
        res.redirect('/'); // Redirect the user to the desired page after logout
    });
});
// Database login/register end
// Start landing
app.get('/', function (req, res) {
    res.render('landingpage', { user: req.session.user });
});
// End landing
// Contact start
var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});
var ContactModel = mongoose.model('Contact', contactSchema, 'contact');
app.get('/contact', function (_req, res) {
    res.render('contact', { user: _req.session.user });
});
app.post('/contact', function (req, res) {
    var _a = req.body, name = _a.name, email = _a.email, message = _a.message;
    // Create a new document using the ContactModel
    var contact = new ContactModel({
        name: name,
        email: email,
        message: message,
    });
    // Save the document to MongoDB
    contact
        .save()
        .then(function () {
        console.log('Contact message saved successfully');
        res.redirect('/'); // Redirect to the homepage or another page after saving
    })
        .catch(function (error) {
        console.error('Error saving contact message:', error);
        res.redirect('/contact'); // Redirect back to the contact page or show an error message
    });
});
// Contact end
// About start
app.get('/about', function (_req, res) {
    res.render('about', { user: _req.session.user });
});
// About end
// Quiz selection start
app.get('/quiz_selection', function (_req, res) {
    res.render('quiz_selection', { user: _req.session.user });
});
// Quiz selection end
// 10_round start
app.get('/10_round', function (_req, res) {
    res.render('10_round', { user: _req.session.user });
});
// 10_round end
// 10_round_endscore start
app.get('/10_round_endscore', function (_req, res) {
    res.render('10_round_endscore', { user: _req.session.user });
});
// 10_round_endscore end
// Sudden death start
app.get('/sudden_death', function (_req, res) {
    res.render('sudden_death', { user: _req.session.user });
});
// Sudden death end
// Sudden death end score start
app.get('/suddendeath_endscore', function (_req, res) {
    res.render('suddendeath_endscore', { user: _req.session.user });
});
// Sudden death end score end
// Middleware to check if user is logged in
var checkLoggedIn = function (req, res, next) {
    if (req.session.loggedIn) {
        // User is logged in, proceed to the next middleware or route handler
        next();
    }
    else {
        // User is not logged in, redirect to the login page or show an error message
        res.redirect('/login'); // Assuming you have a login page at '/login'
    }
};
// Definieer een schema voor de opgeslagen personages
var favoritesSchema = new mongoose.Schema({
    name: String,
    quote: String,
});
// Definieer een model op basis van het schema
var Favorites = mongoose.model('Favorites', favoritesSchema);
//voor het verwijderen van quotes
app.post('/remove-quote', checkLoggedIn, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var quoteIndex, username, user, favorites;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                quoteIndex = req.body.quoteIndex;
                username = (_b = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '';
                return [4 /*yield*/, LoginModel.findById(username).populate('favorites')];
            case 1:
                user = _c.sent();
                if (!user) {
                    throw new Error('User not found');
                }
                favorites = user.favorites;
                // Remove the quote from the favorites list based on the index
                if (Array.isArray(favorites) && favorites.length > quoteIndex) {
                    favorites.splice(quoteIndex, 1);
                }
                // Redirect back to the whitelist page
                res.redirect('/whitelist');
                return [2 /*return*/];
        }
    });
}); });
//einde verwijderen van quotes
// Whitelist start
// Whitelist route with the checkLoggedIn middleware
app.get('/whitelist', checkLoggedIn, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, user, favorites, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                username = (_b = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '';
                return [4 /*yield*/, LoginModel.findOne({ name: username }).populate('favorites')];
            case 1:
                user = _c.sent();
                if (!user) {
                    throw new Error('User not found');
                }
                favorites = user.favorites;
                // Pass the favorites to the view
                res.render('whitelist', { user: req.session.user, favorites: favorites });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _c.sent();
                console.error('Error retrieving favorites:', error_1.message);
                res.status(500).send('Error retrieving favorites');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Whitelist end
app.get('/download-quotes', checkLoggedIn, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, user;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                username = (_b = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '';
                return [4 /*yield*/, LoginModel.find({ name: username }, function (err, docs) {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        if (!user) {
                            throw new Error('User not found');
                        }
                        // Extract the favorites from the user object
                        var favorites = docs.map(function (doc) { return doc.favorites; });
                        if (!favorites || favorites.length === 0) {
                            // If no favorite quotes are found, redirect or display an error message
                            res.redirect('/whitelist');
                            return;
                        }
                        // Generate the content for the text file
                        var content = favorites.map(function (favorite) {
                            //  return `${favorite.name}: ${favorite.quote}`;  HIER IS EEN FOUT!
                        }).join('\n');
                        // Set the response headers to indicate a text file download
                        res.setHeader('Content-disposition', 'attachment; filename=quotes.txt');
                        res.setHeader('Content-type', 'text/plain');
                        // Send the content as the response
                        res.send(content);
                    })];
            case 1:
                user = _c.sent();
                return [2 /*return*/];
        }
    });
}); });
// Blacklist start
app.get('/blacklist', function (_req, res) {
    res.render('blacklist', { user: _req.session.user });
});
// niet aanraken
var blacklistSchema = new mongoose.Schema({
    // Define the fields for the blacklist collection
    quote: String,
    reason: String,
});
// Create a model based on the schema
var BlacklistModel = mongoose.model("Blacklist", blacklistSchema);
app.post("/blacklist", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, document_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data = {
                    quote: req.body.quoteName,
                    reason: req.body.complaint
                    // Extract other fields as necessary
                };
                document_1 = new BlacklistModel(data);
                // Save the document to MongoDB
                return [4 /*yield*/, document_1.save()];
            case 1:
                // Save the document to MongoDB
                _a.sent();
                console.log('Document saved to "blacklist" collection:', document_1);
                res.redirect("/"); // Redirect to the desired page after saving
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Error saving document to "blacklist" collection:', error_2);
                res.redirect("/blacklist"); // Redirect back to the blacklist page or show an error message
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// niet aanraken hierboven
// Blacklist end
app.listen(port, function () {
    console.log('Listening on PORT 8080');
});
module.exports = app;
