let express = require("express");
let app = express();
let moment = require("moment-timezone");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

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

// chaining middlewaresgit commit -m "Add middleware to serve static assets"
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({
      req: {
        time: req.time,
      },
    });
  },
);

// using middleware
app.use("/public", express.static(absolutePathAsset));

app.get("/json", (req, res) => {
  const value = process.env.MESSAGE_STYLE;
  let message = value === "uppercase" ? "HELLO JSON" : "Hello json";
  res.json({ message });
});

app.get("/:word/echo", (req, res) => {
  const echoWord = req.params.word;
  res.json({ echo: echoWord });
});

app.post("/name", (req, res) => {
  const firstName = req.body.first;
  const lastName = req.body.last;

  if (firstName && lastName) {
    const fullName = `${firstName} ${lastName}`;
    console.log(fullName);
    res.json({ name: fullName });
  }
});

// app.get("/name", (req, res) => {
//   const firstName = req.query.first;
//   const lastName = req.query.last;

//   if (firstName && lastName) {
//     const fullName = `${firstName} ${lastName}`;
//     res.json({ name: fullName });
//   } else {
//     res.status(400).json({
//       error:
//         "Please provide both first and last names in the query parameters.",
//     });
//   }
// });

console.log("Hello World");

module.exports = app;
