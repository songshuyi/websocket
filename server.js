var http = require('http');
var server = http.createServer();
var io = require('socket.io')(server);
var fs = require('fs');
var url = require("url");
var xing = ['宋','罗','何','孙','许','沈','王','张','陈','杨'];
var ming = ['亮','毅','阳','娜','晓','宇','明','峰','飞','青']

io.on('connection', function(socket){
    socket.name = xing[Math.floor(Math.random()*10)] + ming[Math.floor(Math.random()*10)];
    io.emit('enter',socket.name + '进来了');
    socket.on('message', function(str){
        io.emit('message',socket.name + ':' + str)
    });
    socket.on('disconnect', function(){
        io.emit('leave',socket.name + '离开了');
    });
});

http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    pathname = pathname.substring(1,pathname.length);
    if(pathname != 'favicon.ico' && pathname != 'socket.io.js.map'){
        pathname = pathname == '' ? 'index.html' : pathname
        fs.readFile(pathname,'utf-8',function(err,data){
            if(err){
                console.log(err);
            }else{
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(data);
                response.end();
            }
        });
    }
}).listen(8888);

server.listen(3000);
