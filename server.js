const express = require("express");
const session = require("express-session");
require("dotenv").config();
const connectDB = require("./db/connect");
const taskRouter = require("./routes/tasks");
const setMessage = require("./middleware/message");

const app = express();
const PORT = process.env.PORT || 8080;

// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs view file

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use("/tasks", setMessage, taskRouter);

app.get("/", function (req, res) {
  var mascots = [
    { name: "Sammy", organization: "DigitalOcean", birth_year: 2012 },
    { name: "Tux", organization: "Linux", birth_year: 1996 },
    { name: "Moby Dock", organization: "Docker", birth_year: 2013 },
  ];
  var tagline =
    "No programming concept is complete without a cute animal mascot.";

  res.render("pages/index", {
    mascots: mascots,
    tagline: tagline,
  });
});

// about page
app.get("/about", function (req, res) {
  res.render("pages/about");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server listening on http://localhost:${PORT}/`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
