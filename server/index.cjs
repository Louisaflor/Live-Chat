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
    // let timeStamp = Date.now()
    // socket.to(room).emit('recieve_message', {

    //   message: `${username} has joined the chat room`,
    //   username: 'Chat Bot',
    //   timeStamp
    // });

    //we also want to send a welcome message
    socket.emit("recieve_message", {
      message: `Welcome ${username}`,
      username: "Chat Bot",
    });
  });

  //In here .on is recveving the message from the client based on "send_message"?
  socket.on("send_message", (msg) => {
    console.log("here is the message in the server: ", msg);

    //socket.broadcast.emit("recieve_message", msg); //this will send the mesasge to everyone, except the sender
    io.emit("recieve_message", msg); //this will send the mesasge to everyone, including the sender
  });
});

server.listen(4000, () =>
  console.log(
    "server is running in here that I created on port 4000 or 3000 heh"
  )
);
