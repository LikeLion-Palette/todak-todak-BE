const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/check-api-stats", (req, res) => {
  res.send("토닥토닥 서버 실행중!");
});

exports.app = functions.https.onRequest(app);
