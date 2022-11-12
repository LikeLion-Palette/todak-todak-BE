const { logger } = require("firebase-functions");
const { createPost, getPostsList } = require("../services/post.service");

/**
 * 포스트 조회 API
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const get = async (req, res, next) => {
  try {
    const postsList = await getPostsList();
    res.send({ posts: postsList });
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

/**
 * 포스트 생성 API
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const create = async (req, res, next) => {
  try {
    const createdPostId = await createPost(req.body);
    res.send({ created_post_id: createdPostId });
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

module.exports.postController = { get, create };
