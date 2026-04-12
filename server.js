//Hämtar express
const express = require("express");

//Anropar applikationen
const app =  express();

//Port till servern
const port = 3000;

//Route till startsidan som tar emot en förfrågan (req) och skickar ett svar (res)
app.get("/", (req, res) => {
    res.send("Hello World!")
});

//Lyssnar och startar applikationen på porten
app.listen(port, () => {
    console.log("Servern startade på port: " + port);
})