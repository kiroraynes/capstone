import './App.css';
import {useEffect, useState, useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import UserContext from './UserContext.js'

import AppNavBar from './components/AppNavBar.js';
import Login from './pages/Login.js';
import PageNotFound from './pages/PageNotFound.js';
import Register from './pages/Register.js';
import Logout from './pages/Logout.js';
import Dashboard from './pages/Dashboard.js';
import Products from './pages/Products.js'
import ProductView from './pages/ProductView.js'
import Cart from './pages/Cart.js';
import CartTile from './components/CartTile.js';

function App() {
  const {user, setUser} = useContext(UserContext);
  useEffect(()=> {
    if (localStorage.getItem('token')) {
      fetch(`${process.env.REACT_APP_API_URL}/user/view`, {
        method: "GET",
        headers : {'Content-type':'application/json', Authorization : `Bearer ${localStorage.getItem('token')}`}
      })
      .then(result => result.json())
      .then(data => {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        });
      })
    }
  }, []);
  return (
    
      <BrowserRouter>
        <AppNavBar />
        <Routes>
          <Route path = '/login' element = {<Login />} />
          <Route path = '/register' element = {<Register />} />
          <Route path = '/logout' element = {<Logout />} />
          <Route path = '/products' element = {<Products />} />
          <Route path = '/dashboard' element = {<Dashboard />} />
          <Route path = '/cart' element = {<Cart />} />
          <Route path = '/carttitle' element = {<CartTile />} />
          <Route path = '/productView/:productId' element = {<ProductView />} />
          <Route path = '*' element = {<PageNotFound />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
