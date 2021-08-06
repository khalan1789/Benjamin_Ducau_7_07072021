//REQUIRED
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const path = require("path")

//ROUTES

const userRoute = require("./routes/userRoute");
const articleRoute = require("./routes/articleRoute");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// gestion des images dans un dossier image statique
app.use('/images', express.static(path.join(__dirname,'images')));

// Appel final les routes configurées
app.use("/api/auth", userRoute);
app.use("/api", articleRoute);
module.exports = app;