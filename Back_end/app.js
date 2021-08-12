// REQUIRED
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const path = require("path")

// ROUTES

const userRoute = require("./routes/userRoute");
const articleRoute = require("./routes/articleRoute");
const commentRoute = require("./routes/commentRoute");
const likeRoute = require("./routes/likeRoute");

// SECURITY MODULES

const helmet = require("helmet")
const dotenv = require("dotenv").config();

// sécurisation des entêtes HTTP
app.use(helmet());

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
app.use('/articlesImages', express.static(path.join(__dirname,'articlesImages')));

// Appel final les routes configurées
app.use("/api/auth", userRoute);
app.use("/api", articleRoute);
app.use("/api", commentRoute);
app.use("/api", likeRoute);

module.exports = app;