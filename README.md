# 토닥토닥 프로젝트 Express.js 서버

Pallete의 팀 프로젝트 '토닥토닥'을 위한 Express.js 서버입니다.

[https://todak-todak.web.app/](https://todak-todak.web.app/)

## 개발 참고사항

### Firebase CLI

- 로컬 테스트시

  ```shell
  $ cd functions
  $ npm run serve
  ```

- 배포시
  ```shell
  $ firebase deploy
  ```
  - 반드시 로컬에 `.env`로 Firebase Admin SDK 관련 환경변수 가지고 있어야 배포가 가능합니다.

## 개발된 API

### 포스트 `/post`

#### GET

- request
  - url
    ```
    https://todak-todak.web.app/post
    ```
- response sample
  ```json
  {
    "posts": [
      {
        "title": "제목제제모오오목",
        "modifiedAt": 1668228491122,
        "uid": 123456,
        "content": "내용내용 좌라라라ㅏㄹ락",
        "tags": ["응원해줘요"],
        "comments": [],
        "subject": "진로",
        "createdAt": 1668228491122
      },
      {
        "content": "나나나나ㅏ난라아날ㄴ아ㅏㅏ",
        "tags": ["고민있어요"],
        "comments": [],
        "title": "글을쓰자글글",
        "createdAt": 1668228434862,
        "subject": "연애",
        "uid": 452313,
        "modifiedAt": 1668228434862
      }
    ]
  }
  ```

#### POST

- request

  - url
    ```
    https://todak-todak.web.app/post
    ```
  - body sample
    ```json
    {
      "uid": 123456,
      "title": "제목제제모오오목",
      "subject": "진로",
      "tags": ["응원해줘요"],
      "content": "내용내용 좌라라라ㅏㄹ락"
    }
    ```

- response sample
  ```json
  {
    "created_post_id": "BHAHO1arZcfXnoQBpSd1"
  }
  ```
