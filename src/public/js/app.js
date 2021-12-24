// socket.io에 접속하게 하는 코드
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  // 어떤 event도 스스로 만들 수 있다.(여기서는 enter_room)
  // object를 srting으로 바꾸지 않아도 된다.
  socket.emit("enter_room", { payload: input.value }, () => {
    console.log("server is done!");
  });
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
