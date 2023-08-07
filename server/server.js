// server작성
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db.js');
const route = require('./route.js');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'html'));
db();
// const server = require('http').createServer(app);
// cors 사용 (cors 미들웨어 삽입)
app.use(express.static(path.join(__dirname, 'html')));
app.use('/', route);
// app.use((req, res, next) => {
//     res.status(404).send('일치 주소 없음');
// })
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('서버 에러!')
// })

app.listen(8080, () => {
    console.log('server is runnig on 8080');
});
