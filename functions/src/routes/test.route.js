const express = require("express");
const { testController } = require("../controllers/test.controller");
const router = express.Router();

// router.get("/", testController.get);
router.get("/", testController.create);

module.exports.testRouter = router;
