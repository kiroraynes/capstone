const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
	userId: {
		type: String,
		required: [true, "UserId required."]},
	products: {
		type: Array,
		required: [true, "Add your items from cart."]
	},
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

module.exports = Orders