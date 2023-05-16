"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path = require('path');
var app = (0, express_1.default)();
var port = process.env.PORT || 8080;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.use(express_1.default.static(path.join(__dirname, '..', 'public')));
app.set("port", 3000);
app.set('views', path.join(__dirname, '..', 'views'));
app.set("view engine", "ejs");
//start landing
app.get('/', function (_req, res) {
    res.render('landingpage');
});
//end landing
//contact start
app.get("/contact", function (_req, res) {
    res.render('contact');
});
app.post("/contact", function (req, res) {
    console.log(req.body);
});
//contact end
//login start
app.get("/login", function (req, res) {
    res.render("login");
});
app.post("/login", function (req, res) {
    console.log(req.body);
});
//login end
//register start
app.get("/register", function (req, res) {
    res.render("register");
});
app.post("/register", function (req, res) {
    console.log(req.body);
});
//register end
//about start
app.get("/about", function (_req, res) {
    res.render('about');
});
//about end
//quiz_selection start
app.get("/quiz_selection", function (_req, res) {
    res.render('quiz_selection');
});
//quiz_selection end
//10_round start
app.get("/10_round", function (_req, res) {
    res.render('10_round');
});
//10_round end
app.listen(port, function () {
    return console.log("Server is listening on ".concat(port));
});
