const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const server = http.createServer(app);

// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

/////////////////

app.use(cors()); //Add CORS middleware

app.get("/", (req, res) => {
  res.send("Hello world");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    method: ["GET", "POST"],
  },
});

//Listening for when the clirnet connects to the sockiet.io - client?
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  //In here is where we write our socket event listeners in here
  socket.on("send_message", (msg) => {
    console.log("here is the message in the server: ", msg);
  });
});

server.listen(4000, () =>
  console.log(
    "server is running in here that I created on port 4000 or 3000 heh"
  )
);
