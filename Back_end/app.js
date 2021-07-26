//REQUIRED
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
// const { Sequelize } = require('sequelize');

// //connexion?
// const sequelize = new Sequelize("groupomania", "root","Groupomania_OC_2021",{
//   dialect: "mysql",
//   host:"localhost"
// })

//ROUTES

const userRoute = require("./routes/userRoute");

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



app.use("/api/users", userRoute);

module.exports = app;