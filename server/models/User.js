const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken"); // 토큰 생성을 위해

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 20,
  },
  email: {
    type: String,
    trim: true, // 스페이스를 없애주는 역할
    unique: 1, // 중복을 허용하지 않음
  },
  password: {
    type: String,
  },
  role: {
    // 관리자와 일반 유저를 구분하기 위한 역할
    type: Number,
    default: 0, // 0은 일반 유저, 1은 관리자
  },
});

userSchema.pre("save", function (next) {
  // save 하기전에 pre 암호화
  let user = this;

  // 비밀번호를 바꿀 때만 암호화
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// 비밀번호를 비교하는 메소드
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword를 암호화해서 db에 있는 비밀번호와 비교
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user
    .save()
    .then((user) => {
      cb(null, user);
    })
    .catch((err) => {
      return cb(err);
    });
};

//토큰 복호화하는 메소드
userSchema.statics.findByToken = function (token, cb) {
  let user = this;

  //토큰 decode
  jwt.verify(token, "secretToken", function (err, decoded) {
    user
      .findOne({ _id: decoded, token: token })
      .then((decode) => {
        cb(null, user);
      })
      .catch((error) => {
        return cb(err);
      });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
