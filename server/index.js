const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors")
// importing the socket.io library,the server is a class that comes from socket.io
const { Server } = require("socket.io");  
// This middleware will solve the cors related issues
app.use(cors());
//The createServer methode will genarate a server
const server = http.createServer(app);

// creating instence of the server (socket.io clss)
// passing our server localhost300
// The cors argument will solve the cors related issues
const io = new Server(server,{
      // we are setting an origine.Thats we are specifying our server react server) to socket.io
    cors:{
       origin:"http://localhost:3000",
       methods:["GET","POST"]

    }
})

io.on("connection",(socket)=>{
    console.log(`user connected:${socket.id}`);
    
    socket.on("Join_room",(data)=>{
        socket.join(data)
        console.log(`user with Id:${socket.id} joind room:${data}`);
    })
    socket.on("send_message",(data)=>{
        console.log(data.message);
        socket.to(data.room).emit("receive_message",data)
    })
    socket.on("disconnect",()=>{
        console.log(`user disconnected:${socket.id}`);
    
    })
})




server.listen(3001,()=>{
    // This callback function is used to indicate the serevr is running
    console.log("SERVER IS RUNNING");
})


