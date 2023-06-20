import {Container, Row, Col, Button, Form, FloatingLabel} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import {Navigate, Link, useNavigate} from 'react-router-dom';
import UserContext from '../UserContext.js';
import Swal2 from 'sweetalert2';

export default function Login(){
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	// we are going to consume or use the user context
	const {user, setUser} = useContext(UserContext);
	const navigate = useNavigate();


	const retrieveUserDetails = (token) => {
	  fetch(`${process.env.REACT_APP_API_URL}/user/VIEW`, {
	    method: "GET",
	    headers : {'Content-type':'application/json', Authorization : `Bearer ${token}`}
	  })
	  .then(result => result.json())
	  .then(data => {
	    setUser({
	      id: data._id,
	      isAdmin: data.isAdmin
	    })
	  })
	}

	function login(event){
		event.preventDefault();

		// process a fetch request to the corresponding backend API

		fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
			method: 'POST',
			headers:{
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(result => result.json())
		.then(data => {
			if(data === false){
				Swal2.fire({
					title : 'Authentication failed!',
					icon : 'error',
					text :  'Check your login details and try again.'
				})
			}else{
				Swal2.fire({
					title: 'Log in successful!',
					icon : 'success',
					text : 'Welcome to Grocer!'
				})
				localStorage.setItem('token', data.auth);
				retrieveUserDetails(data.auth);
				navigate('/')
			}
		})
	}
	useEffect(()=>{
		if(email !== '' && password !== ''){
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [email, password])
	
	return (
		(user.id == null) ?
		<Container>
			<Row>
				<Col className = 'col-10 col-lg-6 mx-auto'>
					<h1 className ='text-center'>Login</h1>
					<Form onSubmit={login}>
					      <FloatingLabel className="mb-3" controlId="formBasicEmail" label = 'Email'>
					        <Form.Control type="email" placeholder="Enter email" value = {email} onChange = {event => setEmail(event.target.value)}/>
					      </FloatingLabel>

					      <FloatingLabel className="mb-3" controlId="formBasicPassword" label = 'Password'>
					        <Form.Control type="password" placeholder="Password" value = {password} onChange = {event => setPassword(event.target.value)}/>
					      </FloatingLabel>

					      <p>No account yet? <Link to = '/register'>Sign up here</Link></p>
					      <Button variant="dark" type="submit" disabled = {isDisabled}>
					        Submit
					      </Button>
				    </Form>
			   </Col>
			</Row>
		</Container>
		:
		<Navigate to = "*" />
		)

}