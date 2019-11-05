let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket-io')(http);
let sweetalert = require('sweetalert');

app.get('/', function(req, res){
    res.sendFile(__dirname, '/client.html');
});

let count=1;

io.on('connection', function(socket){
    console.log('user connected :' + socket.id);
    
    let name = "user" + count++;
    io.to(socket.id).emit('change name',name);

    socket.on('disconnect', function(){
        sweetalert(socket.id + ' user disconnected');
    });

    socket.on('send message', function(name, text){
        let msg = name + ' : ' + text;
        console.log('메세지 :'+msg);
        io.emit('receive message', msg);
    });
});

http.listen(3000, function(){
    console.log('server on!!!!!!!');
});