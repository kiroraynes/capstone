const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
	userId: {
		type: String,
		required: [true, "UserId required."]},
	products: [
		{
			productId: {
				type: String,
				required: [true, "ProductId required"]
			},
			quantity: {
				type: Number,
				required: [true, "Quantiy required"]
			}
		}
	],
	totalAmount : {
		type: Number,
		required: [true, "Total amount required."]
	},
	purchasedOn: {
		type: Date,
		default: new Date()
	}
})

const Orders = mongoose.model("Orders", orderSchema);

model.exports = Orders