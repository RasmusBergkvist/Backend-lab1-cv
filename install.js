//Hämtar PG 
const { Client } = require("pg");

//Läser inställningar för .env
require('dotenv').config();


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
        createTable()
    }
});

//Skapar tabeller
async function createTable() {
    try {
        //Väntar på att SQL-tabell skapas
        const res = await client.query(`
            DROP TABLE IF EXISTS courses;
            CREATE TABLE IF NOT EXISTS courses (
            id SERIAL PRIMARY KEY,
            coursecode VARCHAR(10) UNIQUE,
            coursename VARCHAR(50),
            syllabus TEXT,
            progression VARCHAR(5),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            `)
        //Fångar upp felmeddelande och skriver ut till konsolen
    } catch (error) {
        console.error(error);

    } finally {
        //stänger anslutning till databasen
        await client.end()
    }
}
