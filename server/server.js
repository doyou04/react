// server작성
const express = require('express');
const app = express();
const port = 5000;
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
 mongoose.connect('mongodb://127.0.0.1:27017/user_db_name', (err) => {
	if (err) {
		console.log(err.message);
	} else {
		console.log('Succesfully Connected!');
	}
});

app.set('view engine','html');
app.use(express.json({ extended:false }));
app.use("/api/register", require("./routes/api/register"));
//서버에서 가져온 데이터를 파싱해서 가져와준다.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(8080, () => {
    console.log('server is runnig on 8080');
});
