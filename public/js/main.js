//Refer to chat.html
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

//Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});


//Script tag in chat.html allows use of 
const socket = io();

//Join chat room
socket.emit("joinRoom", { username, room });

//Get room and users
socket.on("roomUsers", ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

//Display message as soon as connection is established in browser console
//Message from server
socket.on("message", message => {
    console.log(message);
    outputMessage(message);
    //Autoscroll down with each new message
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message submit
chatForm.addEventListener("submit", (e) => {
    //Stop reloading after submit
    e.preventDefault();

//Get message text    
//input id on chat-form = msg
        const msg = e.target.elements.msg.value;

        //emit message to server
        socket.emit("chatMessage", msg);

        //clear input
        e.target.elements.msg.value = "";
        //Focus on empty text box
        e.target.elements.msg.focus();
});

//Output message to DOM
function outputMessage(message){
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = ` <p class="meta">${message.username} <span>${message.time}</span></p>
                        <p class="text">
                          ${message.text}
                        </p>`;
                    //Create new div with new message
                        document.querySelector(".chat-messages").appendChild(div);
};

//Add room name to DOM
function outputRoomName(room) {
roomName.innerText = room;
}

//Add users to DOM
function outputUsers(users) {
    userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join("")}`;
}