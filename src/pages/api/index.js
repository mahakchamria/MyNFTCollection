const passport = require("passport");
const samlRoutes = require("./saml");

// Initialize and use Passport middleware
require("./saml"); // Importing passport and strategy setup
const express = require("express");
const app = express();

app.use(passport.initialize());
app.use(passport.session());

// Set up your other API routes here (if any)

// Include the SAML authentication routes
app.use("/saml", samlRouter);

// Export the Express app
module.exports = app;