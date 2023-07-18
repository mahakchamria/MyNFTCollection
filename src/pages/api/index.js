const express = require("express");
const samlRouter = require("./auth/saml");

const app = express();

// Initialize and use Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up your other API routes here (if any)

// Include the SAML authentication routes
app.use("/auth/saml", samlRouter);

// Export the Express app
module.exports = app;