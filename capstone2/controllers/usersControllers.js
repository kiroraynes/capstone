const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('../models/users.js');
const auth = require("../utils/auth.js");

module.exports.registerUser = (request, response) => {
	Users.findOne({email: request.body.email})
	.then(result => {
		if (result){
			return response.send(false)
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
			.then(result => response.send(true)).catch(error => response.send(false));
		}
	}).catch(error => response.send(false));
}

module.exports.loginUser = (request,response) => {
	if (request.body.email && request.body.password) {
		Users.findOne({email: request.body.email})
		.then(result => {
			if(result){
				if (bcrypt.compareSync(request.body.password, result.password)) {
					return response.send({auth: auth.createAccessToken(result)})
				} else {
					return response.send(false)
				}
			} else {
				return response.send(false)
			}
		}).catch(error => response.send(false));
	} else {
		return response.send(false)
	}
}

module.exports.viewProfile = (req,res) => {
	usersData = auth.decode(req.headers.authorization);

	Users.findById(usersData.id)
	.then(result => res.send(result))
	.catch(error => res.send(false))
}