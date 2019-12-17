/* 
Declaring variables/constants 
*/
const socket = io('http://localhost:3000')

const messageContainer = document.getElementById('send-container');

const messageForm = document.getElementById('send-container');

const messageInput = document.getElementById('message-input');

const name = prompt('What is Your Name?');

appendMessage('you Joined');
socket.emit('new-User', name);

//appending chat message
socket.on('chat-message', data =>{
    appendMessage(data);
});
//appending joined user name
socket.on('user-connected', name =>{
    appendMessage (`${name} connected`);
});
/*
preventing page from being refreshed and updating
input field after message was submitted
*/
messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('send-chat-message', message);
    messageInput.value = '';

});

/* Displaying recieved message*/
function appendMessage(message){
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
};