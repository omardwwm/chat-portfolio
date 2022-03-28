const http = require("http");
const express = require("express");
const app = express();
app.use(express.static('./server.js'));
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const port = 8000 || process.env.PORT;

io.on("connection", socket => {
    socket.emit("your id", socket.id);
    socket.on("send message", body => {
        // console.log(body);
        io.emit("message", body)
    })
})

server.listen(port, () => console.log(`server node-express-socket is running on port ${port}`));