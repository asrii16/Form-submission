const express = require("express");
const path = require("path");
const fs = require("fs");
const logger = require("logger"); // Import the file system module
const app = express();
const port = 5501;

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"), function (err) {
    if (err) {
      console.log(err);
    }
  });
});

app.post("/submit", (req, res) => {
  const formData = {
    fname: req.body.fname,
    lname: req.body.lname,
    message: req.body.message,
  };

  // Convert form data to JSON string
  const formDataJSON = JSON.stringify(formData) + "\n";

  // Append form data to a file
  fs.appendFile("formData.txt", formDataJSON, (err) => {
    if (err) {
      console.error("Error writing form data to file:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send("Form Submitted Successfully");
    }
  });
});
// Define a route handler for GET requests to /submit
app.get("/submit", (req, res) => {
  res.send("This is the GET handler for /submit endpoint.");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
