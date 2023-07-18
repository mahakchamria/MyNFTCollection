const express = require("express");
const passport = require("passport");
const SamlStrategy = require("passport-saml").Strategy;

const router = express.Router();

passport.use(
  new SamlStrategy(
    {
        entryPoint: 'https://test110.onelogin.com/trust/saml2/http-post/sso/8c949cda-a8ec-486d-8472-0808f3c38c0d',
        issuer: 'https://my-nft-collection-lime.vercel.app',
        callbackUrl: 'https://my-nft-collection-lime.vercel.app/saml/callback', 
        cert: `-----BEGIN CERTIFICATE-----
        MIID1TCCAr2gAwIBAgIUekjvvAskmDDl7ww1A3e525U0740wDQYJKoZIhvcNAQEF
        BQAwQzEOMAwGA1UECgwFWmVldmUxFTATBgNVBAsMDE9uZUxvZ2luIElkUDEaMBgG
        A1UEAwwRT25lTG9naW4gQWNjb3VudCAwHhcNMjMwNzEyMDk0NzQwWhcNMjgwNzEy
        MDk0NzQwWjBDMQ4wDAYDVQQKDAVaZWV2ZTEVMBMGA1UECwwMT25lTG9naW4gSWRQ
        MRowGAYDVQQDDBFPbmVMb2dpbiBBY2NvdW50IDCCASIwDQYJKoZIhvcNAQEBBQAD
        ggEPADCCAQoCggEBALW/e3ALD8xPTuvPxTSUYCdcjllkjWcgR3OWYB6InNmGtQ7U
        wAbVIdzl4xZ4re1n0JsOSyOQhYDEPpcKMI+lOCQcTgqMKx0WBe28ieFKVmowDDl7
        gPyxzZa4YU6U2UPHqi0JLe4rClSv/aZxHmWaZ2FKp6ALtNsbFe6oVbJ8RzV2kLXh
        FzaQ+e07vxsRUuMd4v/4LjRq3Omge65kvnm2ajeTMEv2uIxpW7s3QeL7NyjcSWU7
        F1CYzPCsDaqDLBiMVmmBcFhPBhmYk/po7c6Ta4qDSBZmQm0P5tOGKb9o5ofQiNcA
        AD0XTQPAZqUDJ6CbYZ/J3/f7NCcbWeWYTn8m9j0CAwEAAaOBwDCBvTAMBgNVHRMB
        Af8EAjAAMB0GA1UdDgQWBBTQnIpzk6yY936Dyw76THosAC2zEDB+BgNVHSMEdzB1
        gBTQnIpzk6yY936Dyw76THosAC2zEKFHpEUwQzEOMAwGA1UECgwFWmVldmUxFTAT
        BgNVBAsMDE9uZUxvZ2luIElkUDEaMBgGA1UEAwwRT25lTG9naW4gQWNjb3VudCCC
        FHpI77wLJJgw5e8MNQN3uduVNO+NMA4GA1UdDwEB/wQEAwIHgDANBgkqhkiG9w0B
        AQUFAAOCAQEAAKRrf82ukz8O1kfe5eSJwwHXvSOWYGFTrZR/MGALbiieFGpK3VIo
        Sy5gq8MU1wCPpk5j6FCVawP3P6CGzcE5iDKX1f3jq6KFCe/WeqslVg8282OflCtV
        T9ORioTL8tPjXJerCT780/9H7cyVpcny/ObFS0xje3jcswpf3M/t4KnzHQ2bx+Wx
        urNYo0FRxCoGB60AnduPE4JZKJ0297R5gx4qtfFxwXYnYHgihnFYKoYwDkyLYG+i
        tEbFxJbYK8+TpQXjEwt8oIF7hOnrUCUz0yrLZ72PN/IIbKkTvw3229N2zsvFtP/l
        I7VFfp5iR9Uv34bz5pZhVhKZYsaS900w2g==
        -----END CERTIFICATE-----`,
    },
    function (profile, done) {
      // Handle user profile data returned by the IdP
      return done(null, profile);
    }
  )
);

// Serialize the user to the session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// Deserialize the user from the session
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Login endpoint - redirects the user to the SAML Identity Provider for authentication
router.get("/login", passport.authenticate("saml"));

// Callback endpoint - handle the SAML response from the Identity Provider
router.post(
  "/callback",
  passport.authenticate("saml", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect or handle as needed.
    res.redirect("/");
  }
);

module.exports = router;