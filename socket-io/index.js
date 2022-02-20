import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const io = new Server({
  cors: {
    origin: [
      "https://bidify-auction-hub.herokuapp.com",
      "http://localhost:3000",
    ],
  },
});

io.on("connection", (socket) => {
  console.log("User connected");

  // receive notification

  socket.on("notification", ({ fullname, message }) => {
    io.emit("receiveNotification", {
      fullname,
      message,
    });
  });

  //upon disconnection lets remove all users from the connection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

io.listen(process.env.PORT);
