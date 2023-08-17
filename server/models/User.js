const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		trim: true,
	},
	password: {
		type: String,
	},

})

userSchema.pre("save", function(next){
	let user = this;

	if(user.isModified("password")){
		bcrypt.genSalt(saltRounds, function(err, salt){
			if(err) return next(err);

			bcrypt.hash(user.password, salt, function(err, hash){
				if(err) return next(err);
				user.password = hash;
				next();
			})
		})
	}else{
		next();
	}
});

userSchema.methods.comparePassword = function(plainPassword, cb){
	bcrypt.compare(plainPassword, this.password, function(err, isMatch){
		if(err) return cb(err);
		cb(null, isMatch);
	})
}

userSchema.methods.generateToken = function(cb){
	// let user = this;
	let token = jwt.sign(this._id.toHexString(), 'secretToken');
	this.token = token;
	this.save()
	.then(user => {
		cb(null, user);
	})
	.catch(err => {
		return cb(err);
	})
}

userSchema.statics.findByToken = function(token, cb){
	let user = this;

	jwt.verify(token, "secretToken", function(err, decoded){
		user.findOne({_id: decoded, token: token})
		.then(decode => {
			cb(null, user);
		})
		.catch(error => {
		 	return cb(err);
		})
	})
};

const User = mongoose.model("User", userSchema);

module.exports = {User};