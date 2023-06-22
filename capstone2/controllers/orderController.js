const express = require('express');
const auth = require('../utils/auth.js');
const Cart = require('../models/cart.js');
const Orders = require('../models/order.js');

module.exports.placeOrder = (req,res) => {
	userData = auth.decode(req.headers.authorization);

	if (userData.isAdmin) {
		console.log('not admin false')
		return res.send(false)
	} else {
		Cart.findOne({user: userData.id})
		.then(result => {
			console.log(result);
			if(!result){
				return res.send(false)
			} else {
				if (result.products) {
					let newOrder = new Orders({
						userId: result.user,
						products: result.products,
						totalAmount: result.total
					})
					newOrder.save()
					.then(saved => {
						result.products = [];
						result.total = 0;
						result.save()
						.then(saved => res.send({id: newOrder.id, response: true}))
						.catch(error => res.send(false))
					}).catch(error => res.send(false))
				} else {
					return res.send(false)
				}
			}
		}).catch(error => res.send(false))
	}
}

module.exports.view = (request, response) => {
	userData = auth.decode(request.headers.authorization);

	Orders.findById(request.params.orderId)
	.then(result => response.send(result))
	.catch(error => response.send(false))
}

module.exports.viewAll = (request, response) => {
	userData = auth.decode(request.headers.authorization);
	userId = userData.id;
	
	Orders.find({userId: userId})
	.then(result => {
		console.log(result);

		response.send(result)})
	.catch(error => response.send(false))
	
}

module.exports.viewAdminAll = (request, response) => {
	userData = auth.decode(request.headers.authorization);
	userId = userData.id;
	
	if(userData.isAdmin){
		Orders.find({})
	.then(result => {
		response.send(result)})
	.catch(error => response.send(false))
} else {
	response.send(false)
}
	
}