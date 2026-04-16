# Laborationsbeskrivning: Severbaserad webbutveckling

I denna uppgift har jag skapat en webbapplikation som är ansluten till en databas. I applikationen ska man kunna lägga till kurser från ett formulär, uppdatera uppgifterna samt kunna radera dem.

*   **Databasserver:** PostgreSQL
*   **NPM-paket:** pg, express, ejs, nodemon, dotenv.
*   **URL till webbplats:** 

För att köra applikationen lokalt:
1. Klona ner repot.
2. Kör npm install.
3. Skapa en .env-fil (se .env.sample).
4. Kör node install.
5. Starta med npm run dev.

## Installations-skript (Install.js)
Ansluter till databasen, kör SQL-frågor som skapar tabellerna och samt stänger anslutningen. Här läses även databasinställningarna in från en .env-fil.

## Server.js
Ansluter till databasen, hämtar Express och startar applikationen. Här finns inställningar för Express som gör att den kan hantera statiska filer via express.static("public") och formulärdata via express.urlencoded({extended: true}).

Här sker även routingen till applikationens vyer som renderas vid GET-anrop. POST används vid hantering av formulärsdata som skickas in via applikationen. Datan hämtas från formulärsfälten via req.body.

## Validering 
Innan datan lagras sker validering av uppgifterna för att se till att de är korrekta. Validering sker även genom SQL-frågor med ILIKE för att förhindra att dubbletter skapas vid både inläggning och redigering av kurserna.

## Säkerhet
Alla SQL-frågor (INSERT, UPDATE och DELETE) är försedda med parameteriserade frågor för att förhindra SQL-injection.

## Felhantering 
Om användaren fyller i felaktiga uppgifter visas ett felmeddelande i vyn. Tidigare ifylld data ligger kvar i fälten så att användaren slipper fylla i allt igen. Vid serverfel skrivs felmeddelanden ut direkt till vyerna.

## Redigering och radering
**Redigering:** Kursen identifieras med sitt ID. Uppgifterna hämtas från databasen och renderas i en vy där de är förifyllda i formulärfälten. Om kursen inte hittas vid GET-anrop omdirigeras användaren till startsidan.

 **Radering:** Görs via ett GET-anrop där kursens ID identifieras,  datan tas bort och användaren omdirigeras till startsidan. Skulle ett fel uppstå hämtas kurslistan och visas tillsammans med ett felmeddelande.
