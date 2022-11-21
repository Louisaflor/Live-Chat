const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors()); //Add CORS middleware

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173/",
    method: ["GET", "POST"],
  },
});

//Listening for when the clirnet connects to the sockiet.io - client?
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  //In here is where we write our socket event listeners in here
});

server.listen(4000, () =>
  console.log(
    "server is running in here that I created on port 4000 or 3000 heh"
  )
);
