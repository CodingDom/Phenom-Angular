const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3002;
const app = express();
require('dotenv').config();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve up static assets (usually on heroku)
const distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Define any API routes
require("./routes/apiRoutes")(app);

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
  console.log(process.env.IMGUR_CLIENT_ID);
});
