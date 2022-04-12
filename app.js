const express = require("express");
const morgan = require("morgan");
const mongooes = require("mongoose");
const blogroutes = require('./routes/blog-routes');

// CONNECT TO MONGODB
const dbUri =
  "mongodb+srv://mushtaqj:ushallpass@noderunthru.frjzc.mongodb.net/node-runthru?retryWrites=true&w=majority";
// express app
const app = express();

// register view engine
app.set("view engine", "ejs");

mongooes
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to Db");
    // listen for requests
    app.listen(3000);
  })
  .catch((err) => console.error("Error connecting to Db", err));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => res.redirect("/blogs"));
app.get("/about", (req, res) => res.render("about", { title: "About" }));

app.use('/blogs',blogroutes);
app.use((_req, res) => res.status(404).render("404", { title: "404" }));
