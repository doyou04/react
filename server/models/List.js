const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // salt를 몇 글자로 할지
const jwt = require("jsonwebtoken");

const listSchema = mongoose.Schema({
  date: {
    type: Date,
  },
  startTime: {
    type: String,
    trim: true,
  },
  endTime: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
});

listSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

listSchema.methods.generateToken = function (cb) {
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

listSchema.statics.findByToken = function (token, cb) {
  let user = this;

  jwt.verify(token, "secretToken", function (err, decoded) {
    user
      .findOne({ _id: decoded, token: token })
      .then((decode) => {
        cb(null, user);
      })
      .chatch((error) => {
        return cb(err);
      });
  });
};

const List = mongoose.model("List", listSchema);

module.exports = { List };
