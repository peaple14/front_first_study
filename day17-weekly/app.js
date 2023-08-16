// app.js (또는 index.js)
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

app.set('port', 3000);
app.set('views', path.join(__dirname, "views")); 
app.set("view engine", "ejs"); 

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave: true,
    saveUninitialized: true
}));


let todoList = [];
let noCnt = 0;
let fileURLPath = path.join(__dirname, "public/todoList.json");



let user={
    id:"user01",
    password:"1234",
    name:"김길동"
}

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'loginform.html'));
  });

app.post('/login', (req, res) => {
    if(req.body.id === user.id && req.body.password === user.password) {
        req.session.authorized = true;
        req.session.user = user;
        res.redirect("/");
    } else {
        res.redirect("/login");
    }
  });


function loadData() {
    // todoList.json 파일에서 데이터를 읽어 와서 초기화
    fs.readFile(fileURLPath, (err, data)=>{;
        let dataObj = JSON.parse(data);
        todoList = dataObj.todoList;
        noCnt = dataObj.noCnt; 
    });
}


app.get('/todo', async (req, res) => {
    console.log(req.session.user);
    if (req.session.user==undefined) {
        return res.redirect("/login"); 
    }
  
    // 파일의 데이터를 로드한다.
    await loadData();
    res.send(todoList);
});

app.post('/todo', async (req, res) => {
    await loadData();
    let title = req.body.title;
    todoList.push({no:noCnt++, title:title, done:false});
    res.send(todoList);
    // 업데이트 된 todoList를 파일에 기록
    fs.writeFileSync(fileURLPath, JSON.stringify({noCnt, todoList}) );
});

// put 요청
app.put('/todo', async (req, res) => {
    await loadData();
    let newData = req.body;
    console.log(newData);ㅣ
    let idx = todoList.findIndex((item) => {
        return newData.no === item.no;
    });
    if(idx != -1) {
        todoList[idx] = newData;
    }

    // 수정 후 파일에 다시 기록
    fs.writeFileSync(fileURLPath, JSON.stringify({noCnt, todoList}) );
    res.send(todoList);
});

app.delete('/todo', async (req, res) => {
    
    await loadData();
    console.log("req.query.no >> ", req.query.no);
    let idx = todoList.findIndex((item) => {
        return item.no === Number(req.query.no);
    });
    if(idx != -1) {
        await todoList.splice(idx, 1);
    }
    // 수정 후 파일에 다시 기록
    fs.writeFileSync(fileURLPath, JSON.stringify({noCnt, todoList}) );
    res.send(todoList);
});

app.listen(app.get('port'), () => {
  console.log(`서버가 http://localhost:${app.get('port')} 에서 실행 중입니다.`);
  loadData();
});
