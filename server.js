const {Client} = require("pg");
require('dotenv').config();

//Hämtar express
const express = require("express");

//Anropar applikationen
const app =  express();

//EJs som view engine
app.set("view engine", "ejs");

//Statiska filer i public-katalog 
app.use(express.static("public"));

//Gör att formulärsdata kan läsas in
app.use(express.urlencoded({extended: true}));

//Anslutning till databas
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
});

//Ansluter till databasen och skapar tabell. Vid fel skrivs felmeddelande ut till konsolen.
client.connect((error) => {
    if (error) {
        console.log('Connection error' + error)
    } else {
        console.log('Connected to database')
    }
});



//Route till startsidan som tar emot en förfrågan (req) och skickar ett svar (res) och rendrar en vyn Index
app.get("/", (req, res) => {
    res.render("index")
});


app.get("/add", (req, res) => {
    res.render("add")
});


//Lyssnar och startar applikationen på porten
app.listen(process.env.PORT, () => {
    console.log("Servern startade på port: " + process.env.PORT);
})