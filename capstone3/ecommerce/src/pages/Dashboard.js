import {Button, Form} from 'react-bootstrap';
import DashNav from '../components/DashNav.js';
import {Navigate} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import UserContext from '../UserContext.js';
import AdminProduct from '../components/AdminProduct.js';

export default function Dashboard(){
	const {user, setUser} = useContext(UserContext);
	const [isLoading, isnotLoading] = useState(true);

	const fetchUserData = () => {
	    if (localStorage.getItem('token')) {
	      fetch(`${process.env.REACT_APP_API_URL}/user/view`, {
	        method: 'GET',
	        headers: {
	          'Content-type': 'application/json',
	          Authorization: `Bearer ${localStorage.getItem('token')}`
	        }
	      })
	        .then(result => result.json())
	        .then(data => {
	          setUser({
	            id: data._id,
	            isAdmin: data.isAdmin
	          });
	          isnotLoading(false);
	        })
	        .catch(error => {
	          console.error('Error fetching user data:', error);
	          isnotLoading(false);
	        });
	    }
	  };
	useEffect(() => {
	    fetchUserData();
	  }, []);

	  if (isLoading) {
	    return <div>Loading...</div>; // Render a loading indicator while waiting for the fetch operation to complete
	  }

	return (
		(user.isAdmin) ?
		<>
			<DashNav />
			<AdminProduct />
		</>
		:
		<Navigate to ='/*' />
		)
}