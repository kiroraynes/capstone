import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import DashNav from '../components/DashNav.js';
import {Navigate} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import UserContext from '../UserContext.js';

export default function Dashboard(){
	const {user, setUser} = useContext(UserContext);

	return (
		(user.isAdmin) ?
		<>
			<DashNav />
		</>
		:
		<Navigate to ='/*' />
		)
}