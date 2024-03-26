var socket = io();
var nicknameForm = document.getElementById('nickname-form');
var nicknameInput = document.getElementById('nickname-input');
var Inputform = document.getElementById('Inputform');
var input = document.getElementById('input');
var messages = document.getElementById('messages');
var userpanel = document.getElementById('user-panel');
let username;


nicknameForm.addEventListener('submit', function(e){
  e.preventDefault();
  var nickname = nicknameInput.value.trim();
  if (nickname !== '') {
    username = nickname; 
    nicknameForm.style.display = 'none'; 
    userpanel.style.display ='';
    console.log(username);
  }
});

Inputform.addEventListener('submit', function(e){
  e.preventDefault();
  if(input.value !== ''){
    socket.emit('chat message', username+" : "+input.value);
  input.value = '';
  }
})

socket.on('chat message', function(msg) {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('user connected', function(msg) {
var item = document.createElement('li');
item.textContent = msg;
messages.appendChild(item);
window.scrollTo(0, document.body.scrollHeight);
})

socket.on('user disconnected', function(msg) {
var item = document.createElement('li');
item.textContent = msg;
messages.appendChild(item);
window.scrollTo(0, document.body.scrollHeight);
});