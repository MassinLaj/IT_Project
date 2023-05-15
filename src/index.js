"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/public', express_1.default.static('public'));
app.set("port", 3000);
app.set("view engine", "ejs");
//start landing
app.get('/', (_req, res) => {
    return res.send('Express Typescript on Vercel');
});
app.get('/ping', (_req, res) => {
    return res.send('pong 🏓');
});
//end landing
//contact start
app.get("/contact", (req, res) => {
    res.render("contact");
});
app.post("/contact", (req, res) => {
    console.log(req.body);
});
//contact end
//login start
app.get("/login", (req, res) => {
    res.render("login");
});
app.post("/login", (req, res) => {
    console.log(req.body);
});
//login end
//register start
app.get("/register", (req, res) => {
    res.render("register");
});
app.post("/register", (req, res) => {
    console.log(req.body);
});
//register end
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
