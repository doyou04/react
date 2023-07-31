// server작성
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const router = express.Router();

// cors 사용 (cors 미들웨어 삽입)
app.use(cors());

app.get('/',(req, res) => {
    res.send({message:'hellow'})
});

server.listen(8080, () => {
    console.log('server is runnig on 8080');
});
