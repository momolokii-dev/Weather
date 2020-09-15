// Empty Obj
projectData = [];

// Require Express
const express = require("express");

// Start up
const app = express();

// Dependencies
const bodyP = require("body-parser");

// configuring express
app.use(bodyP.urlencoded({ extended: false }));
app.use(bodyP.json());

// cors for cross origin allow
const cors = require("cors");
app.use(cors());

// Initialize
app.use(express.static("website"));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}

// Callback Function
app.get("/all", sendD);

function sendD(request, respo) {
  respo.send(projectData);
  projectData = [];
}

// Post Route
app.post("/add", addData);

function addData(request, respo) {
  console.log(request.body);
  newEntry = {
    date: request.body.date,
    temp: request.body.temp,
    content: request.body.content,
  };

  pD.push(newEntry);
}
