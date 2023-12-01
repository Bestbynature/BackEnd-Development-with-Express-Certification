let express = require("express");
let app = express();

// app.get("/", (req, res) => res.send("Hello Express"));
app.get("/", (req, res) => {
  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

const absolutePathAsset = __dirname + "/public";

app.use("/public", express.static(absolutePathAsset));

app.get("/json", (req, res) => {
  const value = process.env.MESSAGE_STYLE;
  let message = value === "uppercase" ? "HELLO JSON" : "Hello gibson";
  res.json({ message });
});

console.log("Hello World");

module.exports = app;
