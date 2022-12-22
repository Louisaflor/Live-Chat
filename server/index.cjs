const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const server = http.createServer(app);

app.use(cors()); //Add CORS middleware

app.get("/", (req, res) => {
  res.send("Hello world");
});

//This version also work with connecting socket.io to the front end as well

// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    method: ["GET", "POST"],
  },
});

//need to store users socket id and username
let chatRoom = "";
let allUsers = []; //all the users in chat room

//Listening for when the clirnet connects to the sockiet.io - client?
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  //create socket where they are requesting to be in a certain room
  socket.on("join room", (info) => {
    const { username, room } = info;
    console.log(`I HAVE RECIVED THE ${username} AND ${room}`);

    //create a room for the user
    socket.join(room);

    //after they joined the room we can create a timestamp to show
    let __timeStamp__ = new Date();
    //we are sending this message to everyone in the room
    //this will now show in the currenty user
    socket.to(room).emit("recieve_message", {
      message: `${username} has joined the chat room`,
      username: "Chat Bot",
    });

    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    let chatUsers = allUsers.filter((user) => user.room === room);
    socket.emit("chatroom_users", chatUsers);

    //sends a message immeditaly to the room pubicly
    //will show in the users page
    socket.emit("recieve_message", {
      message: `Welcome ${username}`,
      username: "Chat Bot",
      time: __timeStamp__,
    });
  });

  //In here .on is recveving the message from the client based on "send_message"?
  socket.on("send_message", (msg) => {
    console.log("here is the message in the server: ", msg);

    //socket.broadcast.emit("recieve_message", msg); //this will send the mesasge to everyone, except the sender
    //io.emit("recieve_message", msg); //this will send the mesasge to everyone, including the sender
  });
});

server.listen(4000, () =>
  console.log(
    "server is running in here that I created on port 4000 or 3000 heh"
  )
);

//socket means it will go to the particular client
//io mean it will listen globally??
