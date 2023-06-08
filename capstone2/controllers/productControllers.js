const express = require('express');
const Products = require('../models/products.js');
const auth = require('../utils/auth.js');

module.exports.createProduct = (request,response) => {
	userData = auth.decode(request.headers.authorization)
	if(userData.isAdmin){
		Products.findOne({name: request.body.name})
		.then(result => {
			if (result){
				return response.send("Product already exist")
			} else {
				let newProduct = new Products({
					name: request.body.name,
					description: request.body.description,
					price: request.body.price,
					stock: request.body.stock
				})
	
				newProduct.save()
				.then(result => response.send("Product Created"))
				.catch(error => {
					console.log(error);
					return response.send(error)})
			}
		}).catch(error => {
			console.log(error);
			return response.send(error)
		});
	} else {
		return response.send("You don't have this privilege. Contact Administrator if this is a mistake.")
	}
}

module.exports.allProducts = (request, response) => {
	Products.find({})
	.then(result => {
		return response.send(result)
	}).catch(error => console.log(error))
}

module.exports.activeProducts = (request, response)=> {
	Products.find({isActive: true})
	.then(result => {response.send(result)})
	.catch(error => response.send(error))
}

module.exports.singleProduct = (request, response) => {
	Products.findById(request.params.productId)
	.then(result => response.send(result))
	.catch(error => response.send(error));
}

module.exports.updateProduct = (request, response) => {
	userData = auth.decode(request.headers.authorization)
	if(userData.isAdmin){
		Products.findByIdAndUpdate(request.params.productId,request.body)
			.then(result => response.send("Product Updated."))
			.catch(error => response.send(error));
	} else {
		return response.send("You don't have access to this route.") 
	}
}

module.exports.archiveProduct = (request, response) => {
	userData = auth.decode(request.headers.authorization)
	if(userData.isAdmin){
		Products.findByIdAndUpdate(request.params.productId,{isActive: false})
		.then(result => response.send("Product archived successfully."))
		.catch(error => response.send(error))
	}
}