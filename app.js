const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const port = process.env.PORT || 3000;
const app = express();
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "7412d42a898c8ee31516ccd2b5504ec9-us6",
  server: "us6",
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
  console.log("got a request");
});

app.post("/", function (req, res) {
  console.log(req.body.First_Name);
  console.log(req.body.Second_Name);
  const fname = req.body.First_Name;
  const lname = req.body.Second_Name;
  const email = req.body.email;

  let subscribingUser = {
    firstName: fname,
    lastName: lname,
    email: email,
  };

  const run = async () => {
    const response = await client.lists.addListMember("4e368f6f33", {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });
    console.log(response); // (optional)
  };
  console.log("hi");

  run();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// API key
// 7412d42a898c8ee31516ccd2b5504ec9-us6

// List ID
// 4e368f6f33
