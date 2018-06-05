const socket = require("socket.io");


module.exports = (server)=>{

    const io = socket(server);

    io.on("connection",(socket)=>{

        console.log("Made socket connection: ",socket.id);

        socket.on("chat",(data)=>{
            console.log(data);
            io.sockets.emit("chat",data);
        });

        socket.on("typing",(data)=>{
            console.log(data);
            socket.broadcast.emit("typing",data);
        });

    });

}
