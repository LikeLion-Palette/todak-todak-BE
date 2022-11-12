const { logger } = require("firebase-functions");
const { admin } = require("../services/firebase.service");

const errMsg = [
  "No Firebase ID token was passed as a Bearer token in the Authorization header.",
  "Make sure you authorize your request by providing the following HTTP header:",
  "Authorization: Bearer <Firebase ID Token>",
  'or by passing a "__session" cookie.',
];

/**
 * Firebase ID Token 유효성 검증하는 middleware
 *
 * 이 이후에 위치한 엔드포인트에 접근하려면 Bearer token이 HTTP header에 들어가 있어야 합니다.
 * * 예) `Authorization: Bearer <Firebase ID Token>`
 *
 * 성공적으로 decode되면 ID Token은 `req.user`에 들어가게 됩니다.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const validateFirebaseIdToken = async (req, res, next) => {
  logger.log("Firebase ID Token 유효성 검증중");

  if (
    (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) &&
    !(req.cookies && req.cookies.__session)
  ) {
    logger.error(...errMsg);
    res.status(403).send(["Unauthorized", ...errMsg].join(" "));
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else if (req.cookies) {
    logger.log("'__session' 쿠키 확인됨");
    idToken = req.cookies.__session;
  } else {
    res.status(403).send("Unauthorized");
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    logger.log("ID Token decoded", decodedToken);
    req.user = decodedToken;
    next();
    return;
  } catch (e) {
    logger.error("ID Token 유효성 검증 통과 못함: ", e);
    res.status(403).send("Unauthorized");
    return;
  }
};

exports.validateFirebaseIdToken = validateFirebaseIdToken;
