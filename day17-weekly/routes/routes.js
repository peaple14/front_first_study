const express = require('express');
const router = express.Router();

let user={
    id:"user01",
    password:"1234",
    name:"김길동"
}

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'loginform.html'));
  });

router.post('/login', (req, res) => {
    if(req.body.id === user.id && req.body.password === user.password) {
        req.session.authorized = true;
        req.session.user = user;
        res.redirect("/");
    } else {
        res.redirect("/login");
    }
  });

  module.exports = router;