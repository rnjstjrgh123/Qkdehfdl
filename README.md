# 증강 윷놀이 온라인

Node.js + Express + Socket.IO 기반 온라인 윷놀이 프로젝트입니다.

## 포함된 수정

- Render/Express가 실제로 제공하는 `public/index.html`을 포함했습니다.
- 루트 `index.html`과 `public/index.html`은 동일한 게임 화면입니다.
- 게임 시작 시 별도 증강 선택창(`/augment-picker.html`)을 엽니다.
- 행운의 윷, 포획왕, 수호 부적, 질주 중 하나를 고르고 확정하면 원래 게임 창을 통해 서버에 전달합니다.
- 모든 플레이어가 증강을 선택해야 게임 진행 단계로 넘어갑니다.
- 팝업이 차단되면 게임 화면의 **증강 선택창 열기** 버튼을 사용할 수 있습니다.
- `npm test`로 파일 구성, 메시지 연결, 증강 단계 코드 및 JavaScript 문법을 검사합니다.

## 로컬 실행

Node.js 18 이상 권장.

```bash
npm install
npm test
npm start
```

브라우저에서 `http://localhost:3000`으로 접속합니다. 온라인 게임을 하려면 모든 참가자가 같은 서버 주소에 접속해야 합니다.

## Render 배포

- Build Command: `npm install`
- Start Command: `npm start`
- Root Directory: 비워 둠 (저장소 루트에 `package.json`이 있는 경우)

GitHub 저장소에 이 ZIP의 프로젝트 파일을 업로드/덮어쓴 뒤 Render에서 재배포해야 합니다. ZIP만 받는 것으로 기존 사이트가 자동 변경되지는 않습니다.
