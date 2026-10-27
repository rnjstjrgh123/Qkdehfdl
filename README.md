# 증강 윷놀이 온라인

Node.js + Express + Socket.IO 기반 온라인 윷놀이 프로젝트입니다.

## 이번 수정

- 게임 시작 시 별도 증강 선택창(`/augment-picker.html`)을 엽니다.
- 행운의 윷, 포획왕, 수호 부적, 질주 중 하나를 선택하고 확정하면 원래 게임 창으로 선택을 전달합니다.
- 원래 게임 창은 선택값을 Socket.IO 서버에 전달하고, 서버가 해당 플레이어의 증강으로 저장해 실제 게임 상태에 반영합니다.
- 모든 플레이어가 증강을 고르면 게임 진행 단계로 전환됩니다.
- 브라우저가 자동 팝업을 차단한 경우 게임 화면의 **증강 선택창 열기** 버튼으로 직접 열 수 있습니다. 팝업이 차단되면 이 사이트의 팝업을 허용해 주세요.
- 실제 서버가 제공하는 `public/index.html`과 루트 `index.html`을 일치시켰습니다.
- 이전 디버그용 파일과 중복 ZIP을 제거하고, 재현 가능한 Node 테스트를 `tests/augment-flow.test.js`에 정리했습니다.

## 실행

Node.js 18 이상 권장.

```bash
npm install
npm test
npm start
```

브라우저에서 `http://localhost:3000`으로 접속합니다. 두 명 이상이 같은 서버 주소에 접속해야 온라인 게임을 시작할 수 있습니다.

## Render 배포

1. 이 프로젝트의 파일을 GitHub 저장소에 업로드합니다.
2. Render 서비스의 Build Command를 `npm install`, Start Command를 `npm start`로 설정합니다.
3. 배포가 완료되면 새로고침하거나 강력 새로고침(Ctrl+F5)합니다.
4. 사이트가 `/augment-picker.html`을 서비스하는지 확인합니다.

참고: ZIP 파일을 받는 것만으로 기존 GitHub/Render 배포가 자동 변경되지는 않습니다. 저장소에 반영하고 재배포해야 합니다.
