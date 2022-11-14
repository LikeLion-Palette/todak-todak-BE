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

### Express.js Data Flow

> `/check-api-stats`, `/` 를 제외한 다른 모든 경로는 로그인 세션 토큰이 있어야 접근할 수 있습니다.

> 로그인 세션 토큰 유효성은 `validateFirebaseIdToken` 미들웨어에서 확인합니다.

1. 요청이 들어온다.
2. `index.js`에서 순서대로 middleware 통과
3. `index.js`에서 일치하는 엔드포인트 찾음
   - 일치하는 엔드포인트가 없었을 경우 `/` 경로에 해당하는 API 동작
   - 에러가 발생했을 경우 `handleErrors()` 미들웨어가 처리
4. 각 엔드포인트별 `router` 동작
5. 각 `router` 에서는 HTTP Request Method의 종류와 세부 경로 따라 적절한 `controller` 호출
6. 각 `controller`에서는 적절한 `service` 호출 및 에러 `catch`
7. 각 `service`에서는 실제 DB(Firestore)와 상호작용
   - create 명령일 경우 `model` 클래스를 활용해 인스턴스를 생성하고, `model`의 `getData()` 메서드로 객체를 받음. 모델의 생성자에서는 데이터 유효성 검증
8. `service`에서의 상호작용 결과를 `controller`가 다시 받아 적절한 `respond` 전송

> `firebase.config.js`는 Firebase와의 연동을 위한 코드가 담겨있으며, 대부분의 `service`에서 공동으로 사용함

> `serviceAccount.config.js`에는 Firebase 연동을 위한 환경변수 로드 등 환경설정용 코드가 포함됨

> `constants`에는 `tagsList`, `subjectList` 등 모델의 유효성 검증을 위해 미리 정해진 카테고리 리스트 등을 선언함

- 폴더구조 설계에 참고한 Repository: [expressjs-structure](https://github.com/geshan/expressjs-structure)

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
