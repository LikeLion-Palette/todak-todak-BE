const { subjectList } = require("../constants/subjectList.constant");
const { tagsList } = require("../constants/tagsList.constant");

class Post {
  constructor({ uid, title, subject, tags, content }) {
    if (!uid || !title || !subject || tags.length === 0 || !content)
      throw Error("[포스트 Post Request Error] 포스트 데이터에 모든 값을 넣어주세요.");

    if (!subjectList.includes(subject))
      throw Error("[포스트 Post Request Error] 주제가 잘못 입력됐습니다.");

    tags.forEach((tag) => {
      if (!tagsList.includes(tag))
        throw Error("[포스트 Post Request Error] 태그가 잘못 입력됐습니다.");
    });

    this.uid = uid;
    this.title = title;
    this.subject = subject;
    this.tags = tags;
    this.content = content;

    const now = Date.now();
    this.createdAt = now;
    this.modifiedAt = now;

    this.comments = [];
  }

  getPost() {
    return {
      uid: this.uid,
      title: this.title,
      subject: this.subject,
      tags: this.tags,
      content: this.content,
      createdAt: this.createdAt,
      modifiedAt: this.modifiedAt,
      comments: this.comments,
    };
  }
}

exports.Post = Post;
