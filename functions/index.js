const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { handleErrors } = require("./src/middlewares/errorHandler.middleware");
const { testRouter } = require("./src/routes/test.route");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/check-api-stats", testRouter);

app.get("/", (req, res) => {
  res.send({ message: "서버 동작중" });
});

app.use(handleErrors);

exports.app = functions.https.onRequest(app);
