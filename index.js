// simple Express.js app, framework for building Node.js

// importing the Express framework
var express = require("express")
var app = express()

// defining routes

// handles GET requests to the root / url
app.get("/", function (req, res) {
    res.send("fech-cha DevOps!")
});

// dynamic route
app.get("/error_or_not/:text", function (req, res) {
    if (req.params.text === "error") {
      res.status(500).send(req.params.text);
      return;
    }
    res.status(200).send(req.params.text);
  });

// start the server
app.listen(3000); 