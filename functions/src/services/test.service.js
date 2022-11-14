const { firestore } = require("../configs/firebase.config");

const createDoc = async (data) => {
  const respose = await firestore.collection("test").add({ name: "test" });
  return respose.id;
};

module.exports = {
  createDoc,
};
