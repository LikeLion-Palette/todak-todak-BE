const { firestore } = require("./firebase.service");

const createDoc = async (data) => {
  const respose = await firestore.collection("test").add({ name: "test" });
  return respose.id;
};

module.exports = {
  createDoc,
};
