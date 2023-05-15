import express from "express"

const app = express();
app.set("port", 3000);
app.set("view engine", "ejs");

app.get("/contact", (req, res) =>{
    res.render("contact");
});

app.post("/contact", (req, res) => {
    res.render("emailsent");
});

app.listen(app.get("port"), () => {
    console.log(`Web app has started on http://localhost:${app.get("port")}`);
});
