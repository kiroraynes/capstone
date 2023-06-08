const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "We need to know who's ordering."]
  },
  products: [
    {
      productId: {
        type: String,
        required: [true, "What's the user adding?"]
      },
      quantity: {
        type: Number,
        default: 1
      },
      subtotal: {
        type: Number,
        required: [true, "What's the subtotal?"]
      }
    }
  ],
  total: {
    type: Number,
    required: [true, "How much is the total?"]
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;