# 토닥토닥 프로젝트 Express.js 서버

Pallete의 팀 프로젝트 '토닥토닥'을 위한 Express.js 서버입니다.

## 개발 참고사항

### Firebase CLI

- 로컬 테스트시

  ```shell
  $ firebase emulators:start
  ```

- 배포시
  ```shell
  $ firebase deploy
  ```
  - 반드시 로컬에 `.env`로 Firebase Admin SDK 관련 환경변수 가지고 있어야 배포가 가능합니다.
