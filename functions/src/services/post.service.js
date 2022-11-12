const { Post } = require("../models/post.model");
const { firestore } = require("./firebase.service");

const getPostsList = async () => {
  const respose = await firestore
    .collection("posts")
    .orderBy("modifiedAt", "desc")
    .orderBy("createdAt", "desc")
    .get();
  return respose.docs.map((doc) => doc.data());
};

const createPost = async (data) => {
  const newPost = new Post(data);

  const respose = await firestore.collection("posts").add(newPost.getPost());

  return respose.id;
};

module.exports = { getPostsList, createPost };
