const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
	},
});

userSchema.methods.hashPassword = async function (password) {
	this.password = await bcrypt.hash(password, 10);
};

userSchema.methods.isValidPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = model('User', userSchema);
