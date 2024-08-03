const button = document.querySelector(".btn");
const input = document.querySelector(".input");
const chat = document.querySelector(".chat")
const list = document.querySelector(".list");

const socket = io();

//send message
button.addEventListener("click", () => {
   let text =  input.value;
   input.value = "";
   let message = {
      sender: socket.id,
      text,
   }
   socket.emit("message", message);
})


// incoming messages
socket.on("message", (message) => {
   if (!message.text) return;
   const msgElem = document.createElement("li")
   if (message.sender == socket.id) {
      msgElem.classList.add("me");
   } else {
      msgElem.classList.add("other");
   }
   msgElem.textContent = message.text;
   list.appendChild(msgElem);
})
