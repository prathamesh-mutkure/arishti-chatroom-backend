require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT ?? 3000;
const DB_URL = process.env.DB_URL;

const app = express();
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

server.listen(PORT, () => {
  console.log("Listening on PORT 3000");
});
