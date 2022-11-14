const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const path = require("path");

/* Middlewares */
const { validateFirebaseIdToken } = require("./src/middlewares/loggin.middleware");
const { handleErrors } = require("./src/middlewares/errorHandler.middleware");

/* Routers */
const { testRouter } = require("./src/routes/test.route");
const { postRouter } = require("./src/routes/post.route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));

app.use("/check-api-stats", testRouter);
app.get("/", (req, res) => {
  res.send({ message: "서버 동작중" });
});

/**
 * 로그인 확인 미들웨어
 */
app.use(validateFirebaseIdToken);

app.use("/posts", postRouter);

app.use(handleErrors);

exports.app = functions.https.onRequest(app);
