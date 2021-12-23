import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
// 탬플릿 엔진을 파일들이 들어있는 위치를 지정
app.set("views", __dirname + "/views");
// 서버에 있는 폴더들을 일반적으로 프론트에서 볼 수 없으니 한 폴더를 볼 수 있게 지정
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://loaclhost:3000`);

// 서버를 만듦
const server = http.createServer(app);

// 다음 설정을 통해 http서버, websocket서버 둘 다 돌릴 수 있게 된다.
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected from the Browser ❌"));
  socket.on("message", (message) => {
    sockets.forEach((aSocket) => aSocket.send(message.toString()));
  });
});

// app.listen과 달라 보이지 않지만 http와 ws를 둘 다 사용할 수 있다는 점에서 크게 다르다.
server.listen(3000, handleListen);
