const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { handleErrors } = require("./src/middlewares/errorHandler.middleware");
const { testRouter } = require("./src/routes/test.route");
const { postRouter } = require("./src/routes/post.route");
const { admin } = require("./src/services/firebase.service");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const { validateFirebaseIdToken } = require("./src/middlewares/loggin.middleware");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));

app.use("/check-api-stats", testRouter);
app.get("/", (req, res) => {
  res.send({ message: "서버 동작중" });
});

app.get("/login-demo", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "main.html"));
});

// 쿠키, headers 등을 확인해 Firebase 로그인 여부 확인하는 middleware
app.use(validateFirebaseIdToken);
app.get("/checkLoggedin", (req, res) => {
  res.send({ message: "로그인 확인됨" });
});

app.use("/post", postRouter);

app.use(handleErrors);

exports.app = functions.https.onRequest(app);
