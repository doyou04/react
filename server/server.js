// server작성
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");
require("dotenv").config();
// const { List } = require('./modles/List');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser:true,
    // useMongoClient:true
  })
  .then(() => console.log("MongoDB Connected ... "))
  .catch((err) => console.log(err));

// 회원가입
app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});
// 로그인
app.post("/api/users/login", (req, res) => {
  // 요청된 이메일 데이터베이스에 있는지 찾음
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "이메일에 해당되는 회원이 없습니다. ",
        });
      }

      // 요청된 이메일이 데이터 베이스에 있으면 비밀번호가 맞는지 비밀번호 확인
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });
        }
        // 비밀번호까지 맞다면 토큰 생성
        user.generateToken((error, user) => {
          if (error) {
            return res.status(400).send(error);
          }
          res.cookie("x_auth", user.token).status(200).json({
            loginSuccess: true,
            userId: user._id,
          });
          console.log(user.token);
        });
      });
    })
    .catch((error) => {});
});
// auth
app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
  });
  console.log(req.user.email);
});
// 로그아웃
app.get(`/api/users/logout`, auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

// 게시물 등록
// app.post('/api/todo/create', (req, res) => {
// 	const list = new List(req.body);
// 	list.save()
// 	.then(() => {
// 		res.status(200).json({
// 			success: true,
// 		})
// 	}).catch(err => {
// 		res.json({success: false, err});
// 	})
// })

app.listen(process.env.PORT, () => {
  console.log(`server is runnig on ${process.env.PORT}`);
});
