let express = require("express");
let app = express();
let moment = require("moment-timezone");

// app.get("/", (req, res) => res.send("Hello Express"));
app.get("/", (req, res) => {
  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

const absolutePathAsset = __dirname + "/public";

// middleware logger or every route and for all http methods
app.use("/", function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware, (req, res) => {
  res.send({
    time: req.time,
  });
});
// app.get(
//   "/now",
//   function (req, res, next) {
//     req.time = moment().tz("Africa/Lagos").format();
//     // req.time = new Date().toString();
//     next();
//   },
//   function (req, res) {
//     console.log(req.time);
//     res.send({
//       time: req.time,
//     });
//   },
// );

// using middleware
app.use("/public", express.static(absolutePathAsset));

app.get("/json", (req, res) => {
  const value = process.env.MESSAGE_STYLE;
  let message = value === "uppercase" ? "HELLO JSON" : "Hello json";
  res.json({ message });
});

console.log("Hello World");

module.exports = app;
