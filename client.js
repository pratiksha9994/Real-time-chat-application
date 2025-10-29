// client.js (runs in browser)
const socket = io();

const form = document.getElementById('form');
const mynameInput = document.getElementById('myname');
const messageInput = document.getElementById('message');
const messageArea = document.getElementById('messageArea');

let mynameVal = "";

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!mynameVal) {
    mynameVal = mynameInput.value.trim();
  }
  const text = messageInput.value.trim();
  if (mynameVal && text) {
    socket.emit('chat message', { sender: mynameVal, text: text });
    messageInput.value = "";
  }
});

socket.on('chat message', data => {
  const p = document.createElement('p');
  p.classList.add('message');

  // decide class based on who sent it
  if (data.sender === mynameVal) {
    p.classList.add('you');
  } else {
    p.classList.add('other');
  }

  p.innerHTML = `<span class="username">${data.sender}:</span> ${data.text}`;
  messageArea.appendChild(p);
  messageArea.scrollTop = messageArea.scrollHeight;
});
