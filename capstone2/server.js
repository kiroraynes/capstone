const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRoutes = require('./routes/usersRoutes.js')
const productRoutes = require('./routes/productRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');

const app = express();
const port = 4000;

// mongodb connection

mongoose.connect("mongodb+srv://admin:admin@batch288raynes.skaaxyv.mongodb.net/EcommerceAPI?retryWrites=true&w=majority",{
	useNewUrlParser:true,
	useUnifiedTopology:true
});

const db = mongoose.connection;
	db.on('error',console.error.bind(console, "Error, can't connect to db"));
	db.once('open', () => console.log("We are connected to the database!"));

// middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// for the sake of the bootcamp only (bad practice)
app.use(cors());

// routes

app.use('/user', usersRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

app.listen(port, ()=> {
	console.log(`Server is running at localhost:${port}`)
});