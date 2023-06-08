const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "First Name is required."]
	},
	lastName: {
		type: String,
		required: [true, "Last Name is required."]
	},
	email: {
		type: String,
		required: [true,"Email is required."]
	},
	password: {
		type: String,
		required: [true,"Password is required."]
	},

	isAdmin: {
		type: Boolean,
		default: false
	},
	mobileNo: {
		type: String,
		required: [true, "Please input your number."]
	},
	address: {
		street: {
			type: String,
			required: [true, "Please input a valid address."]
		},
		city: {
			type: String,
			required: [true,"Please input your city."]
		},
		province: {
			type: String,
			required: [true, "Please input your province."]
		},
		 country: {
		 	type: String,
		 	required: [true, "Please input your country."]
		 },
		 postalCode: {
		 	type: Number,
		 	required: [true, "Please input your postal code."]
		 }
	}
});

const Users = mongoose.model("Users", userSchema);


module.exports = Users;