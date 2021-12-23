// backend와 connection을 열어줌
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const socket = new WebSocket(`ws://${window.location.host}`);

// 서버와 연결이 되면 실행
socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

// 서버로부터 받은 데이터를 표시
socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
});

// 서버와 연결이 끊어졌을 경우 실행
socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
