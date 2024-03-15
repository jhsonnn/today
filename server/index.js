const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
//Set static path
app.use(express.static(path.join(__dirname, "client/public")));
app.use(bodyParser.json());
//키값 넣기
// const publicVapidKey =
// const privateVapidKey =
webPush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

//Subscribe Route
app.post("/subscribe", (req, res) => {
  //Get pushSubscription object
  const subscription = req.body;
  // Send 201 - resource created
  res.status(201).json({});
  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });
  // Pass object into sendNotification
  webPush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});
const port = 7777;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});