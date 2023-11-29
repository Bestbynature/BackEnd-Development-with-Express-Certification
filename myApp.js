let express = require("express");
let app = express();

// app.get("/", (req, res) => res.send("Hello Express"));
app.get("/", (req, res) => {
  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

console.log("Hello World");

module.exports = app;
