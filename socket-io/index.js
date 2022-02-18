import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const io = new Server({
  cors: { origin: "http://localhost:3000" },
});

//if connection is in effect lets receive all Users from the client side and emit back their ids and socketids
io.on("connection", (socket) => {
  console.log("User connected");

  //upon disconnection lets remove all users from the connection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

io.listen(process.env.PORT);
