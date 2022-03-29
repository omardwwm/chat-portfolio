const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {
    cors: {
        origins: "*"
    }
});
const port = process.env.PORT || 8000;
// io.origins('*:*')

io.on("connection", socket => {
    socket.emit("your id", socket.id);
    socket.emit("time", socket.time)
    socket.on("send message", body => {
        // console.log(body);
        io.emit("message", body)
    })
})

server.listen(port, () => console.log(`server node-express-socket is running on port ${port}`));