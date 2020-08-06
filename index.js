const express = require("express");
const app = express();
const ejsLayout = require("express-ejs-layouts");
const fs = require("fs")//use to read json files

//tell express that were going to use ejs as the view engine
app.set("view engine", "ejs");
app.use(ejsLayout);

app.get("/", (req,res) => {
    res.render("home");
})

//index route
app.get("/dinosaurs", (req,res) => {
    //get the json from dinosaurs.json
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    //convert the json to javascript
    let dinoData = JSON.parse(dinosaurs);
    console.log(dinoData);
    //render our dino index page and pass it in the dino data as myDinos
    res.render("dinosaurs/index", {myDinos: dinoData});
})

//show route
app.get("/dinosaurs/:id", (req, res) => {
    //get the json from dinosaurs.json
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    //convert the json to javascript
    let dinoData = JSON.parse(dinosaurs);
    //grab id paramter from url and convert to an int - it was a string originally
    let dinoIndex = parseInt(req.params.id);
    //grab the 
    res.render("dinosaurs/show", {myDino: dinoData[dinoIndex]})
})

app.listen(8000);