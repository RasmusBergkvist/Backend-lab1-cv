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
app.get("/", async (req, res) => {
    try {

        // Väntar på att databasen hämtar inlagd data
        const result = await client.query("SELECT * FROM courses ORDER BY coursecode");
        res.render("index", { courses: result.rows });

        //Vid fel skapas en tom array för att undvika crash med forEach-loopen, samt skriver ut meddelande till användaren.
    } catch (error) {
        console.error(error);
        res.render("index", {
            courses: [],
            databaseError: "Kurserna kan inte hämtas just nu, försök igen senare"

        }

        )

    }
});



//Route till Lägg till kurs som renderar vyn Add.
app.get("/add", (req, res) => {
    res.render("add")
});


//Posta och valderingen av kursen uppgifter.
app.post("/add", async (req, res) => {

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
    try {
        //Minst fem tecken. Lärosäten har olika längd på kurskoder.
        if (coursecode.length < 5) {
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


        //Kontrollerar om kurskod eller kursnamn redan finns i databasen
        const checkCode = await client.query(
            "SELECT * FROM courses WHERE coursecode ILIKE $1",
            [coursecode]
        );

        if (checkCode.rows.length > 0) {
            coursecodeError = "Kurskoden finns redan inlagd."
        }


        const checkName = await client.query(
            "SELECT * FROM courses WHERE coursename ILIKE $1",
            [coursename]
        );

        if (checkName.rows.length > 0) {
            coursenameError = "Kursnamnet finns redan inlagt."
        }


        //Vid fel visas felmeddelanden och formulärfälten behåller sina värden
        if (coursecodeError || coursenameError || syllabusError || progressionError) {
            return res.render("add", {
                coursecode,
                coursename,
                syllabus,
                progression,
                coursecodeError,
                coursenameError,
                syllabusError,
                progressionError

            });
        }

        const result = await client.query(
            //Sätter in värden i databasen med parametriserad fråga för att förhindra SQL-injection
            "INSERT INTO courses(coursecode, coursename, syllabus, progression) VALUES($1, $2, $3, $4)",
            [coursecode, coursename, syllabus, progression]


        );
        //Om allt är OK skickas användaren tillbaka till startsidan
        res.redirect("/");

    } catch (error) {
        console.error(error);
        //Vid fel skriver meddelande ut till användaren. Värden i formulärsfältet står kvar. 
        res.render("add", {
            coursecode,
            coursename,
            syllabus,
            progression,
            postError: "Det går inte att lägga till kursen just nu, försök igen senare."

        });
    }
});

//Omdirigerar användaren till startsidan om id saknas i URL:en för att förhindra felmeddelanden.
app.get("/edit", (req, res) => {
    res.redirect("/")
});


//Redigera kurser från databasen
app.get("/edit/:id", async (req, res) => {
    const id = req.params.id;

    try {
        // Väntar på att databasen hämtar inlagd data
        const result = await client.query(
            "SELECT * FROM courses WHERE id= $1", [id]
        );

        //Om det inte finns något att redigera skicka användaren tillbaka till startsidan.
        if(result.rows.length === 0) {
            return res.redirect("/");
        }

        //Renderar vyn edit med värden från tabellens raden för hämtad kurs.
        res.render("edit", {
            course: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        //Vid fel skapas en tomt objekt för att undvika crash med ReferenceError om data inte kunde hämtas, samt felmeddelande skrivs ut till användaren.
        res.render("edit", {
            course: {},
            getDataError: " Det gick inte att hämta uppgifterna om kusen just nu, försök igen senare."
        });

    }
});


//Posta och validerar ändringar av kursens uppgifter

app.post("/edit/:id", async (req, res) => {
    const id = req.params.id;

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
    try {
        //Minst fem tecken. Lärosäten har olika längd på kurskoder.
        if (coursecode.length < 5) {
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


        //Kontrollerar om kurskod redan finns i databasen, men jämför inte mot sitt egna id.
        const checkCode = await client.query(
            "SELECT * FROM courses WHERE coursecode ILIKE $1  AND id != $2",
            [coursecode, id]
        );

        if (checkCode.rows.length > 0) {
            coursecodeError = "Kurskoden finns redan inlagd."
        }


        //Kontrollerar om kurskod eller kursnamn redan finns i databasen, men jämför inte mot sitt egna id.
        const checkName = await client.query(
            "SELECT * FROM courses WHERE coursename ILIKE $1 AND id != $2",
            [coursename, id]
        );

        if (checkName.rows.length > 0) {
            coursenameError = "Kursnamnet finns redan inlagt."
        }


        // Vid fel visas formuläret igen med felmeddelanden och befintliga värden
        if (coursecodeError || coursenameError || syllabusError || progressionError) {
            return res.render("edit", {
                course: {
                    id,
                    coursecode,
                    coursename,
                    syllabus,
                    progression
                },
                coursecodeError,
                coursenameError,
                syllabusError,
                progressionError

            });
        }


        const result = await client.query(
            //Sätter in värden i databasen med parametriserad fråga för att förhindra SQL-injection
            "UPDATE courses SET coursecode= $1, coursename = $2, syllabus = $3, progression = $4 WHERE id = $5",
            [coursecode, coursename, syllabus, progression, id]


        );
        //Om allt är OK skickas användaren tillbaka till startsidan
        res.redirect("/");

        //Vid fel finns värden kvar i formulärsfältet, samt felmeddelande skrivs ut till användaren.
    } catch (error) {
        console.error(error);
        res.render("edit", {
            course: {
                id,
                coursecode,
                coursename,
                syllabus,
                progression
            },
            updateError: "Det gick inte att uppdatera uppgifterna just nu, försök igen senare."

        });



    }
});



//Raderar kurser från databasen
app.get("/delete/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await client.query(
            // Parametriserad fråga för att förhindra SQL-injection
            "DELETE FROM courses WHERE id = $1", [id]
        );
        //Om allt är OK skickas användaren till startsidan vid raderad kurs.
        res.redirect("/");

    } catch (error) {
        //Vid fel hämtas kurserna på nytt och skrivs ut tillsammans med felmeddelande.
        const result = await client.query("SELECT * FROM courses ORDER BY coursecode");

        console.error(error);
        res.render("index", {
            courses: result.rows,
            deleteError: "Det gick inte att ta bort kursen, försök igen senare."
        });
    }
});

//Route till Om webbplatsen som renderar vyn About.
app.get("/about", (req, res) => {
    res.render("about")
});

//Lyssnar och startar applikationen på porten
app.listen(process.env.PORT, () => {
    console.log("Servern startade på port: " + process.env.PORT);
});