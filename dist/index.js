"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = process.env.PORT || 8080;
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/public', express_1.default.static('public'));
app.set("port", 3000);
app.set("view engine", "ejs");
//start landing
app.get('/', function (_req, res) {
    return res.send('Express Typescript on Vercel');
});
app.get('/ping', function (_req, res) {
    return res.send('pong 🏓');
});
//end landing
//contact start
app.get("/contact", function (req, res) {
    res.render("contact");
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
app.listen(port, function () {
    return console.log("Server is listening on ".concat(port));
});
