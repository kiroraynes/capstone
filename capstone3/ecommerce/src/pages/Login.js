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

	function login(event){
		event.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
			method: 'POST',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(result => result.json())
		.then(data => {
			let token = data.auth;
			if(token){
				fetch(`${process.env.REACT_APP_API_URL}/user/view`, {
					method: 'GET',
					headers: {'Content-type': 'application/json', Authorization: `Bearer ${token}`}
				})
				.then(result => result.json())
				.then(profile => {
					console.log('getting profile');
					setUser({
						id: profile._id,
						isAdmin: profile.isAdmin
					});
					console.log(user);
						if(user.isAdmin){
							navigate('/dashboard');
						} else {
							navigate('/')
						}
					
				})

				Swal2.fire({
					title: 'Login successful',
					icon: 'success',
					text: 'Enjoy Shopping!'
				})
				localStorage.setItem('token', token)

			} else {
				Swal2.fire({
					title: 'Login failed',
					icon: 'error',
					text: 'Please check your email or password.'
				})
			}
		})
	}

	useEffect(()=>{
		if(email != '' && password != ''){
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [email, password])
	
	return (
		(user.id === null) ?
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