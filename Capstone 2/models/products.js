const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required."]
  },
  description: { 
    type: String, 
    required: [true, "Description is required."]
  },
  price: { 
    type: Number, 
    required: [true, "Price is required."]
  },
  stock:{
    type: Number,
    default: 0
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  createdOn: {
    type: Date,
    default: new Date()
  }
});

const Products = mongoose.model('Products', productSchema);

module.exports = Products;