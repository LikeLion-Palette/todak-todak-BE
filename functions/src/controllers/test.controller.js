const { createDoc } = require("../services/test.service");

const get = (req, res, next) => {
  try {
    res.send({ message: "서버 동작중" });
  } catch (err) {
    console.error("test 에러", err.message);
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const createdDocId = await createDoc();
    res.send({ created_doc_id: createdDocId });
  } catch (err) {
    console.error("test 에러", err.message);
    next(err);
  }
};

module.exports.testController = {
  get,
  create,
};
