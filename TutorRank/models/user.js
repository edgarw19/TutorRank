var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcrypt-nodejs');

var User = new Schema({
	username: String,
	password: String,


	//{type: String, set :function(newValue) {
		//return Hash.isHashed(newValue) ? newValue : Hash.generate(newValue);
	}
);

User.plugin(passportLocalMongoose);


/*UserSchema.statics.authenticate = function(email, password, callback) {
	this.findOne({ email: email }, function(error, user) {
		if (user && Hash.verify(password, user.password)) {
			callback(null, user);
		} else if (user || !error) {
			// Email or password was invalid (no MongoDB error)
			error = new Error("Your email address or password is invalid. Please try again.");
			callback(error, null);
		} else {
			// Something bad happened with MongoDB. You shouldn't run into this often.
			callback(error, null);
		}
	});
};*/

module.exports = mongoose.model('User', User);