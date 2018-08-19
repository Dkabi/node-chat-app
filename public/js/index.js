var socket = io(); //To establishing web socket connection between client and server

// built in socket event when server connect
socket.on('connect',()=>{
    console.log('connected to server');

    //custom socket event to create an event name as createEmail
    socket.emit('createMessage',{
        from:"kabidibyajyoti@gmail.com",
        text:"Hi"
    });
});


//custom socket event   to listen newEmail Event
socket.on('newMessage',(message)=>{
    console.log('New Message',message);
});



// built in socket event when server disconnect
socket.on('disconnect',()=>{
    console.log('disconnected from server');
});