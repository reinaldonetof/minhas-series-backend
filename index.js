const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongo = process.env.MONGODB || "mongodb://localhost/minhas-series";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

app.use(express.json());
app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("index"));

mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log("listening on: " + port));
  })
  .catch((e) => {
    console.log(e);
  });
