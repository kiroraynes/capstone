const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('../models/users.js');
const auth = require("../utils/auth.js");

module.exports.registerUser = (request, response) => {
	Users.findOne({email: request.body.email})
	.then(result => {
		if (result){
			return response.send("Email is taken. Try logging in or registering a new email.")
		} else {
			let newUser = new Users({
				firstName: request.body.firstName,
				lastName: request.body.lastName,
				email: request.body.email,
				password: bcrypt.hashSync(request.body.password, 10),
				mobileNo: request.body.mobileNo,
				address: {
					street: request.body.address.street,
					city: request.body.address.city,
					province: request.body.address.province,
					country: request.body.address.country,
					postalCode:request.body.address.postalCode
				}
			});

			newUser.save()
			.then(result => response.send('User has been registered')).catch(error => response.send(error));
		}
	}).catch(error => response.send(error));
}

module.exports.loginUser = (request,response) => {
	if (request.body.email && request.body.password) {
		Users.findOne({email: request.body.email})
		.then(result => {
			if(result){
				if (bcrypt.compareSync(request.body.password, result.password)) {
					return response.send(auth.createAccessToken(result))
				} else {
					return response.send("Please check your password.")
				}
			} else {
				return response.send("User not found.")
			}
		}).catch(error => response.send(error));
	} else {
		return response.send("Both fields need to be filled.")
	}
}

module.exports.viewProfile = (req,res) => {
	usersData = auth.decode(req.headers.authorization);

	Users.findById(usersData.id)
	.then(result => res.send(result))
}