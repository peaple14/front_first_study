var http = require('http');

// 웹 서버 객체만듦
var server = http.createServer();

server.listen(3000, ()=>{
    console.log('http://127.0.0.1:'+3000);
});

server.on('connection', function(socket){
    console.log("클라이언트 접속 >>>");
});

server.on('request', function(req,res){
    console.log("클라이언트 요청 >>>");
    res.end("<h1>Hello world!</h1>");
});

server.on('close',function(){
    console.log("클라이언트 종료 >>>");
});