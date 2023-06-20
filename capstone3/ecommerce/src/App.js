import './App.css';
import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {UserProvider} from './UserContext.js';

import AppNavBar from './components/AppNavBar.js';
import Login from './pages/Login.js';
import PageNotFound from './pages/PageNotFound.js';
import Register from './pages/Register.js';
import Logout from './pages/Logout.js';
import Dashboard from './pages/Dashboard.js';

function App() {
  useEffect(() => {
      if(user.id === null){
        const token = localStorage.getItem('token');
        if (token) {
          fetch(`${process.env.REACT_APP_API_URL}/user/view`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
            .then(result => result.json())
            .then(data => {
              setUser({
                id: data._id,
                isAdmin: data.isAdmin
              });
            });
        }
      }
    }, []);

  const [user,setUser] = useState({
    id: null,
    isAdmin: null
  });
  const unsetUser = () => {
    localStorage.clear();
  }
  
  console.log(user);
  return (
    <UserProvider value ={{user,setUser, unsetUser}}>
      <BrowserRouter>
        <AppNavBar />
        <Routes>
          <Route path = '/login' element = {<Login />} />
          <Route path = '/register' element = {<Register />} />
          <Route path = '/logout' element = {<Logout />} />
          <Route path = '/dashboard' element = {<Dashboard />} />
          <Route path = '*' element = {<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
    
  );
}

export default App;
