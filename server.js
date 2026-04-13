const { Client } = require("pg");
require('dotenv').config();

//Hämtar express
const express = require("express");

//Anropar applikationen
const app = express();

//EJs som view engine
app.set("view engine", "ejs");

//Statiska filer i public-katalog 
app.use(express.static("public"));

//Gör att formulärsdata kan läsas in
app.use(express.urlencoded({ extended: true }));

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
    res.render("add", {
        //Tömmer felmeddelanden när sidan laddas första gången.
        coursecodeError: "",
        coursenameError: "",   
        syllabusError: "",
        progressionError: ""
    });
});

app.post("/add", (req, res) => {

    //Hämtar värde från input
    const coursecode = req.body.coursecode;
    const coursename = req.body.coursename;
    const syllabus = req.body.syllabus;
    const progression = req.body.progression;

    //Rensar felmeddelanden
    let coursecodeError = "";
    let coursenameError = "";
    let syllabusError = "";
    let progressionError = "";

    //Validering av input

    //Minst fem tecken. Lärosäten har olika längd på kurskoder.
    if (coursecode.length < 6) {
        coursecodeError = "Fyll i kurskod (minst 5 tecken)";
    }
    if (!coursename) {
        coursenameError = "Fyll i kursnamn";
    }
    if (!syllabus) {
        syllabusError = "Fylls i url till kursplan";
    }

    if (!progression) {
        progressionError = "Fyll i kursens progression";
    }

    //Skriv ut felmeddelande
    if (coursecodeError || coursenameError || syllabusError || progressionError) {
        return res.render("add", {
            coursecodeError,
            coursenameError,
            syllabusError,
            progressionError

        });
    }


    //Om allt är OK skickas användaren tillbaka till startsidan
    res.redirect("/");
});


//Lyssnar och startar applikationen på porten
app.listen(process.env.PORT, () => {
    console.log("Servern startade på port: " + process.env.PORT);
})