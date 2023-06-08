const express = require('express');
const auth = require('../utils/auth.js');
const Cart = require('../models/cart.js');
const Orders = require('../models/order.js');

module.exports.placeOrder = (req,res) => {
	userData = auth.decode(req.headers.authorization);

	if (userData.isAdmin) {
		return res.send('Admin account detected. You do not have this functionality.')
	} else {
		Cart.findById(req.body.id)
		.then(result => {
			if(!result){
				return response.send('Cart not found')
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
						.then(saved => res.send('Order Placed'))
						.catch(error => res.send('Sorry, please try placing order again.'))
					}).catch(error => res.send('Sorry, please try placing order again.'))
				} else {
					return response.send(`You don't have items in your cart. Please add first.`)
				}
			}
		}).catch(error => res.send('You might have not added any products yet.'))
	}
}

module.exports.view = (request, response) => {
	userData = auth.decode(request.headers.authorization);

	Orders.findById(request.params.orderId)
	.then(result => response.send(result))
	.catch(error => response.send(error))
}