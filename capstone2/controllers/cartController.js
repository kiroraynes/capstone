const express = require('express');
const Cart = require('../models/cart.js');
const auth = require('../utils/auth.js');
const Products = require('../models/products.js');


module.exports.addToCart = (req,res) => {
	userData = auth.decode(req.headers.authorization);

	function changesStock(a){
		Products.findById(req.body.productId)
		.then(a => {
			a.stock -= req.body.quantity;
			a.save()
			.then(saved => res.send('Product added to cart'))
			.catch(error => {
				console.log(error);
				return res.send('Please try adding the product again')});
		}).catch(error => {
			console.log(error)
			return res.send(error)});
	}
	Cart.findOne({user:userData.id})
	.then(result => {
		if (result){
			Products.findById(req.body.productId)
			.then(prodQuery => {
				if (prodQuery.stock >= req.body.quantity){
					i = result.products.findIndex((product) => product.productId === req.body.productId);
					if (i < 0){
						result.products.push({
							productId: req.body.productId,
							quantity: req.body.quantity,
							subtotal: req.body.quantity * prodQuery.price
						});
						result.total += req.body.quantity * prodQuery.price
						result.save()
						.then(saved => {
							changesStock(prodQuery);
						})
						.catch(error => {
							console.log('I might have saved but isAdded is false');
							res.end(error)
						});
					} else {
						result.products[i].quantity+=req.body.quantity;
						result.products[i].subtotal += req.body.quantity * prodQuery.price;
						result.total += req.body.quantity * prodQuery.price
						result.save()
						.then(saved => {
							changesStock(prodQuery);
						})
						.catch(error => {
							console.log('I might have saved but isAdded is false');
							res.end(error)
						});
					}
					
				} else {
					return res.end("Exceeded available quantity")
				}
			}).catch(error => res.send(error))	
		}  else {
			console.log(`I'm not yet in the cart collection`);
			Products.findById(req.body.productId)
			.then(prodQuery => {
				console.log('Querying product ', prodQuery.stock);
				if (prodQuery.stock >= req.body.quantity) {
					let newCart = new Cart({
						user: userData.id,
						products:[{
							productId: req.body.productId,
							quantity: req.body.quantity,
							subtotal: req.body.quantity * prodQuery.price
						}],
						total: req.body.quantity * prodQuery.price
					});
					newCart.save()
					.then(saved => {
						changesStock(prodQuery);
					})
					.catch(error => {
						console.log('I might have saved but isAdded is false');
						res.end(error)
					});
				} else {
					return res.send("Exceeded available quantity")
				}
			}).catch(error => console.log(error))
		}
	})
}

module.exports.removeFromCart = (req,res) => {
	userData = auth.decode(req.headers.authorization);
	Cart.findOne({user: userData.id})
	.then(result => {
		 if (result) {
		 	i = result.products.findIndex(product => product.productId === req.params.productId)
		 	a = result.products[i].quantity;
		 	result.total -= result.products[i].subtotal;
		 	result.products.splice(i,1);
		 	result.save()
		 	.then(() => {
		 		Products.findById(req.params.productId)
		 		.then(prodQuery => {
		 			prodQuery.stock += a;
		 			prodQuery.save()
		 			.then()
		 			.catch(() => res.send(`Can't communicate with database.`))
		 		})
		 		res.send('Product removed')
		 	})
		 	.catch(() => res.send('Product could not be removed. Check your cart again.'))
		 } else {
		 	return res.send(`Product not in cart.`)
		 }


	}).catch(error => res.send(error))
}

module.exports.view = (request, response) => {
	userData = auth.decode(request.headers.authorization);

	Cart.findById(request.params.orderId)
	.then(result => response.send(result))
	.catch(error => response.send(error))
}
