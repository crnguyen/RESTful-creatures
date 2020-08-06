const express = require("express");
const app = express();
const ejsLayout = require("express-ejs-layouts");

//tell express that were going to use ejs as the view engine
app.set("view engine", "ejs");
app.use(ejsLayout);

app.get("/", (req,res) => {
    res.render("home");
})

app.listen(8000);