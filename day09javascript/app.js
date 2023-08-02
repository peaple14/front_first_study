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
app.use('/public', express.static(__dirname + '/public'));

// 라우트 설정
let memberList = [
    {no:1, name:"김길동", dept:"영업", position:"과장", email:"gildong@saram.com", photo:"img01.jpg"},
    {no:2, name:"김길순", dept:"관리", position:"사원", email:"bbbb@saram.com", photo:"img02.jpg"},
    {no:3, name:"박길동", dept:"관리", position:"부장", email:"aaaa@saram.com", photo:"img01.jpg"},
    {no:4, name:"이순신", dept:"사업", position:"책임", email:"cccc@saram.com", photo:"img01.jpg"},
    {no:5, name:"일지매", dept:"영업", position:"과장", email:"test01@saram.com", photo:"img01.jpg"}
];

let noCnt = 6;

app.get('/member/list', (req, res) => {
    res.send(memberList);
});

app.post('/member/input', (req, res) => {
    var form =  new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        fileList = [];
        for(var i=0; i<files.filetoupload.length; i++) {
            var oldpath = files.filetoupload[i].filepath;
            var filePath = '/upload/' + files.filetoupload[i].originalFilename;
            var newpath = __dirname + '/public' + filePath;
            fileList.push(filePath);
            await fs.copyFile(oldpath, newpath, function (err) {
                if (err) throw err;
            });
        } 
        res.redirect("/filelist");
    });
});

// 서버 실행
const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log("Server is running at http://127.0.0.1:"+ app.get('port'));
});

