const express = require('express');
const Cart = require('../models/cart.js');
const auth = require('../utils/auth.js');
const Products = require('../models/products.js');


module.exports.addToCart = (req,res) => {
	userData = auth.decode(req.headers.authorization);

	if (userData.isAdmin){
		return res.send(false)
	} else {
		function changesStock(a){
			Products.findById(req.body.productId)
			.then(a => {
				a.stock -= req.body.quantity;
				a.save()
				.then(saved => res.send(true))
				.catch(error => {
					return res.send(false)});
			}).catch(error => {
				return res.send(false)});
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
								res.end(false)
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
								res.end(false)
							});
						}
						
					} else {
						return res.end(false)
					}
				}).catch(error => res.send(false))	
			}  else {
				Products.findById(req.body.productId)
				.then(prodQuery => {
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
							res.end(false)
						});
					} else {
						return res.send(false)
					}
				}).catch(error => res.send(false))
			}
		})
	}
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
		 			.catch(() => res.send(false))
		 		})
		 		res.send(true)
		 	})
		 	.catch(() => res.send(false))
		 } else {
		 	return res.send(false)
		 }


	}).catch(error => res.send(false))
}

module.exports.view = (request, response) => {
	userData = auth.decode(request.headers.authorization);

	Cart.findOne({user: userData.id})
	.then(result => response.send(result))
	.catch(error => response.send(false))
}


module.exports.decreaseQuantity = (req, res) => {
	userData = auth.decode(req.headers.authorization);
	prodId = req.params.productId;

	Cart.findOne({user: userData.id})
	.then(result => {
		i = result.products.findIndex((product) => product.productId === prodId);
		function changesStock(a){
			Products.findById(prodId)
			.then(b => {
				b.stock += 1;
				b.save()
				.then(saved => res.send(true))
				.catch(error => {
					return res.send(false)});
			}).catch(error => {
				return res.send(false)});
		}

		Products.findById(prodId)
		.then(a => {
			if (i>=0) {
				result.products[i].quantity -= 1;
				result.products[i].subtotal -= a.price;
				result.total -= a.price
				result.save()
				.then(saved => {
					changesStock(a);
				})
				.catch(error => {
					res.end(false)
				});
			}
		})

	})
}

module.exports.increaseQuantity = (req, res) => {
	userData = auth.decode(req.headers.authorization);
	prodId = req.params.productId;

	Cart.findOne({user: userData.id})
	.then(result => {
		i = result.products.findIndex((product) => product.productId === prodId);

		function changesStock(a){
			Products.findById(prodId)
			.then(b => {
				b.stock -= 1;
				b.save()
				.then(saved => res.send(true))
				.catch(error => {
					return res.send(false)});
			}).catch(error => {
				return res.send(false)});
		}

		Products.findById(prodId)
		.then(a => {
			console.log(a);

			if (i>=0) {
				result.products[i].quantity += 1;
				result.products[i].subtotal += a.price;
				result.total += a.price;
				result.save()
				.then(saved => {
					changesStock(a);
				})
				.catch(error => {
					res.end(false)
				});
			}
		})

	})
}