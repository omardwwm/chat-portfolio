require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());

const DB_URI = process.env.DB_URI;
mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connection reussie a mongodb Portfolio "))
    .catch((err) => console.log(err));
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {
    cors: {
        origins: "*" 
    }
});
const port = process.env.PORT || 8000;
// io.origins('*:*')

const RouteAdmin = require("./routes/RouteAdmin"); 
app.use("/admin", RouteAdmin);

io.on("connection", socket => {
    socket.emit("your id", socket.id);
    socket.emit("time", socket.time)
    socket.on("send message", body => {
        // console.log(body);
        io.emit("message", body)
    })
})

server.listen(port, () => console.log(`server node-express-socket is running on port ${port}`));