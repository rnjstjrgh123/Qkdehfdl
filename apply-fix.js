const fs = require("fs");
const path = require("path");
const root = process.cwd();

function edit(rel, replacements) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) {
    console.log("SKIP (파일 없음): " + rel);
    return;
  }
  let text = fs.readFileSync(file, "utf8");
  let changed = false;
  for (const [from, to] of replacements) {
    if (text.includes(to)) continue; // 이미 적용된 수정
    if (!text.includes(from)) {
      console.log("확인 필요: " + rel + " 에서 수정할 원본 문장을 찾지 못했습니다.");
      continue;
    }
    text = text.replace(from, to);
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(file, text, "utf8");
    console.log("수정 완료: " + rel);
  } else {
    console.log("변경 없음: " + rel);
  }
}

const ackOld = 'function emitAck(event,data){return new Promise(resolve=>socket.emit(event,data===undefined?{}:data,resolve))}';
const ackNew = 'function emitAck(event,data){return new Promise(resolve=>{let settled=false;const timer=setTimeout(()=>{if(!settled){settled=true;resolve({ok:false,error:"서버 응답이 없습니다. 연결 상태를 확인하고 다시 시도하세요."})}},12000);socket.emit(event,data===undefined?{}:data,res=>{if(settled)return;settled=true;clearTimeout(timer);resolve(res||{ok:false,error:"서버에서 응답을 받지 못했습니다."})})})}';
const pageshowOld = 'socket.on("disconnect",()=>{$("conn").textContent="연결 끊김 · 재연결 중…"});socket.on("connect_error",()=>{$("conn").textContent="서버 연결 재시도 중…"});';
const pageshowNew = pageshowOld + 'window.addEventListener("pageshow",e=>{if(e.persisted){try{socket.connect()}catch(_){} }});';
const posOld = 'const pt=outer[(15+Math.max(0,pos))%outer.length];';
const posNew = '// Start at bottom-left and move right along the bottom edge.\n   const pt=outer[(15-Math.max(0,pos)+40)%20];';

edit("server.js", [
  ['const io = new Server(server, { cors: { origin: "*" } });',
   'const io = new Server(server, { cors: { origin: "*" }, pingInterval: 25000, pingTimeout: 60000, connectTimeout: 30000 });'],
  ['app.use(express.static(path.join(__dirname, "public")));\napp.get("/", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));',
   'const publicDir = path.join(__dirname, "public");\nconst publicIndex = path.join(publicDir, "index.html");\nconst rootIndex = path.join(__dirname, "index.html");\napp.use(express.static(publicDir));\napp.get("/healthz", (_req, res) => res.status(200).json({ ok: true }));\napp.get("/", (_req, res) => {\n  // Render fallback: serve the root copy if public/index.html is missing in a deployment.\n  res.sendFile(require("fs").existsSync(publicIndex) ? publicIndex : rootIndex);\n});']
]);

for (const file of ["public/index.html", "index.html"]) {
  edit(file, [[ackOld, ackNew], [pageshowOld, pageshowNew], [posOld, posNew]]);
}
console.log("\n끝났습니다. public/index.html이 없다면 public 폴더를 만들고 index.html을 넣어야 합니다.");
