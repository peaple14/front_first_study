const express = require('express');
const app = express();
const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 포트 
app.set('port', 5000);
// 뷰엔진 템플릿 설정
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// 정적 파일 제공 설정
app.use(express.static('public'));

// 라우트 설정
app.get('/hello', (req, res) => {
  res.send('Hello, Express!');
});

let fileList = [];

app.get('/filelist', (req, res) => {
    req.app.render('filelist', {fileList}, (err, html) => {
        if(err) throw err;
        res.end(html);
    })
});

app.post('/fileupload', (req, res) => {
    var form =  new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        fileList = [];
        for(var i=0; i<files.filetoupload.length; i++) {
            var oldpath = files.filetoupload[i].filepath;
            var filePath = '/upload/' + files.filetoupload[i].originalFilename;
            var newpath = __dirname + '/public' + filePath;
            // filelist에서 사용 될 이미지 목록
            fileList.push(filePath);
            // 이동이 아닌 복사하고 이전 파일 제거.
            await fs.copyFile(oldpath, newpath, function (err) {
                if (err) throw err;
            });
        } // end of for
        res.redirect("/filelist");
    });
});

// 서버 실행
const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log("Server is running at http://127.0.0.1:"+ app.get('port'));
});
