require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth_routes");
const messageRoutes = require("./routes/message_routes");
const { saveMessageToDB } = require("./controllers/message_controller");

const PORT = process.env.PORT ?? 8000;
const DB_URL = process.env.DB_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const server = http.createServer(app);
const io = new Server(server);

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(`ERR: ${err}`);
  });

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("NEW_MESSAGE", (msg) => {
    const message = JSON.parse(msg);

    console.log(message);

    saveMessageToDB(message.from_id, message.from_username, message.text);
  });

  socket.emit("NEW_MESSAGE", {
    id: "x",
    text: "Hello from server",
    from_id: "62b4b3d292d2e25c6085cca5",
    from_username: "user1",
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

app.use("/api", authRoutes);
app.use("/api", messageRoutes);

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
