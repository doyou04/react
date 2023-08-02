// server작성
const express = require('express');
const path = require('path');
const app = express();
const db = require('./db.js');
const route = require('./route.js');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'html'));
db();
// const server = require('http').createServer(app);
// cors 사용 (cors 미들웨어 삽입)
app.use(express.static(path.join(__dirname, 'html')));
app.use('/', route);


app.listen(8080, () => {
    console.log('server is runnig on 8080');
});
