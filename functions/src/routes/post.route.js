const express = require("express");
const { postController } = require("../controllers/post.controller");
const router = express.Router();

router.get("/", postController.get);
router.post("/", postController.create);

module.exports.postRouter = router;
