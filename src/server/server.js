import express from "express";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server); 

app.use(express.static(path.join(__dirname, '../client')));

let connections = 0;
io.on("connection", (socket) => {
  ++connections
  console.log("Connection", socket.id);
  console.log("Connectoins", connections)

  socket.on("message", (message) => {
    io.emit("message", message); 
  });

  socket.on("disconnect", () => {
    --connections;
    console.log("Disconnection", socket.id);
    console.log("Connectoins", connections)
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
