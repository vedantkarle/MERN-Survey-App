const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("./config/keys");
const session = require("express-session");

mongoose
  .connect(keys.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((e) => {
    console.log(e);
  });

const app = express();

app.use(
  session({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    resave: false,
    saveUninitialized: true,
    secret: keys.sessionSecret,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

//Passport Config
require("./services/passport");

//Routes
const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");
const surveyRoutes = require("./routes/surveyRoutes");

app.use("/", authRoutes);
app.use("/", billingRoutes);
app.use("/", surveyRoutes);

if (process.env.NODE_ENV === "production") {
  //Express will serve production assets
  app.use(express.static("client/build"));

  //Express will serve the index.html if it doesn't recognize the route
  const path = require("path");

  app.get("*", (req, res) => {
    const index = path.join(__dirname, "client", "build", "index.html");
    res.sendFile(index);
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("SERVER STARTED");
});
