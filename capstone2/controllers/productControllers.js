const express = require('express');
const Products = require('../models/products.js');
const auth = require('../utils/auth.js');

module.exports.createProduct = (request,response) => {
	userData = auth.decode(request.headers.authorization)
	if(userData.isAdmin){
		Products.findOne({name: request.body.name})
		.then(result => {
			if (result){
				return response.send(false)
			} else {
				let newProduct = new Products({
					name: request.body.name,
					description: request.body.description,
					category: request.body.category,
					price: request.body.price,
					pic: request.body.pic,
					stock: request.body.stock
				})
	
				newProduct.save()
				.then(result => response.send(true))
				.catch(error => {
					return response.send(false)})
			}
		}).catch(error => {
			return response.send(false)
		});
	} else {
		return response.send(false)
	}
}

module.exports.allProducts = (request, response) => {
	userData = auth.decode(request.headers.authorization)
	if(userData.isAdmin){
		Products.find({})
		.then(result => {

			return response.send(result)
		}).catch(error => response.send(false))
	} else {
		return reponse.send(false)
	}
	
}

module.exports.activeProducts = (request, response)=> {
	Products.find({isActive: true})
	.then(result => {response.send(result)})
	.catch(error => response.send(false))
}

module.exports.singleProduct = (request, response) => {
	Products.findById(request.params.productId)
	.then(result => response.send(result))
	.catch(error => response.send(false));
}

module.exports.updateProduct = (request, response) => {
	userData = auth.decode(request.headers.authorization)
	if(userData.isAdmin){
		Products.findByIdAndUpdate(request.params.productId, request.body)
			.then(result => response.send(true))
			.catch(error => response.send(false));
	} else {
		return response.send(false) 
	}
}

module.exports.archiveProduct = (request, response) => {
	userData = auth.decode(request.headers.authorization)
	if(userData.isAdmin){
		Products.findByIdAndUpdate(request.params.productId,{isActive: false})
		.then(result => response.send(true))
		.catch(error => response.send(false))
	} else {
		return response.send(false)
	}
}

module.exports.unarchiveProduct = (request, response) => {
	userData = auth.decode(request.headers.authorization)
	if(userData.isAdmin){
		Products.findByIdAndUpdate(request.params.productId,{isActive: true})
		.then(result => response.send(true))
		.catch(error => response.send(false))
	} else {
		return response.send('No access')
	}
}


module.exports.catProducts = (request, response)=> {
	cat = request.params.cat;
	console.log(cat);

	Products.find({category: cat})
	.then(result => {response.send(result)})
	.catch(error => response.send(false))
}