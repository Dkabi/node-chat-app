const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const dateTime = require('node-datetime');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');

io.on('connection',(socket)=>{

  //when client try to connect with the server it listens
  console.log("New User Connected");
  

  //create event 
   

  //listen custom event from client
  socket.on("createMessage",(data)=>{
        
    console.log(data);
    socket.emit("newMessage",generateMessage("ADMIN","Welcome To The Chat App"));
    socket.broadcast.emit("newMessage",generateMessage("ADMIN","New User joined"));
    //custom  event reate and send to client 
    io.emit("newMessage",generateMessage(data.from,data.text)); 

  });  


  //when client disconnected from server it listens
  socket.on('disconnect',()=>{
    console.log("client disconnected");
  });
});



server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
