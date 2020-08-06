const express = require("express");
const app = express();
const ejsLayout = require("express-ejs-layouts");
const fs = require("fs")//use to read json files

//tell express that were going to use ejs as the view engine
app.set("view engine", "ejs");
app.use(ejsLayout); //tells express to let us use a layout template
app.use(express.urlencoded({extended: false})) // body parser middleware

app.get("/", (req,res) => {
    res.render("home");
})

app.get("/prehistoric_creatures", (req,res) => {
    let creatures = fs.readFileSync("./prehistoric_creatures.json");
    let creatureData = JSON.parse(creatures);
    let creatureFilter = req.query.creatureFilter;
    if (creatureFilter) {
        creatureData = creatureData.filter((creature) => {
            return creature.type.toLowerCase() === creatureFilter.toLowerCase();
        })
    }
    
    //render our creatures index page
    res.render("prehistoric_creatures/index", {myCreatures: creatureData});
})

app.get("/prehistoric_creatures/new", (req, res) => {
    res.render("prehistoric_creatures/new");

})

app.get("/prehistoric_creatures/:id", (req, res) => {
    let creatures = fs.readFileSync("./prehistoric_creatures.json");
    let creatureData = JSON.parse(creatures);
    let creatureIndex = parseInt(req.params.id);
    res.render("prehistoric_creatures/show", {myCreatures: creatureData[creatureIndex]})
})

app.post("/prehistoric_creatures", (req,res) => {
    let creatures = fs.readFileSync("./dinosaurs.json");
    let creatureData = JSON.parse(creatures); //dino data is an array
    //push new dino to the array
    creatureData.push(req.body);
    //convert dinodata back to json and write to dinosaurs.json file
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creatureData)); //does the opposite of JSON parse
    // redirect to the index GET route
    res.redirect("/prehistoric_creatures");
})

//DINOSAURS IS WORKING!!!

//index route
app.get("/dinosaurs", (req,res) => {
    //get the json from dinosaurs.json
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    //convert the json to javascript
    let dinoData = JSON.parse(dinosaurs);
    let nameFilter = req.query.nameFilter;
    //console.log(nameFilter);
    //console.log(req.query);
    //keep in dinodata any dinos whos name matches the nameFilter the user searched for
    //this is the part that makes the list list disappear upon searching for name of dino
    if (nameFilter) {
        dinoData = dinoData.filter((dino) => {
            return dino.name.toLowerCase() === nameFilter.toLowerCase();
        })
    }
    //render our dino index page and pass it in the dino data as myDinos
    res.render("dinosaurs/index", {myDinos: dinoData});
})


//get the new dino form
app.get("/dinosaurs/new", (req, res) => {
    res.render("dinosaurs/new");
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

//post a new dino
app.post("/dinosaurs", (req,res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs); //dino data is an array
    //push new dino to the array
    dinoData.push(req.body);
    //convert dinodata back to json and write to dinosaurs.json file
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData)); //does the opposite of JSON parse
    // redirect to the index GET route
    res.redirect("/dinosaurs");
})


app.listen(8000);