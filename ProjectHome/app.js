var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override");

var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/alisher_hometask", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use("/", indexRoutes);

app.listen(3000, function () {
  console.log("Сервер начал свою работу");
});
