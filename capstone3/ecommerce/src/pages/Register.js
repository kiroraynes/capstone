import {Container, Row,	Col, Button, Form,  FloatingLabel} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

import {useState, useEffect, useContext} from 'react';
import UserContext from '../UserContext.js';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import Swal2 from 'sweetalert2';


export default function Register(){
	const [firstName, setFirst] = useState('');
	const [lastName, setLast] = useState('');
	const [mobNum, setMob] = useState('');
	const [street,setStreet] = useState('');
	const [city, setCity] = useState('');
	const [province, setProvince] = useState('');
	const [country, setCountry] = useState('');
	const [postalCode, setPostal] = useState('');
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	const [isDisabled, setIsDisabled] = useState('false');

	const {user, setUser} = useContext(UserContext);

	const navigate = useNavigate();
	useEffect(() => {
		if ((firstName!== '' && lastName!== '' && mobNum != '' && street!== '' && city!= '' && province !='' && country != '' && postalCode !='' && email!== '' && password1 !=='' && password2 !== '' ) && password1 === password2) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	})

	function register(event){
		event.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
			method: 'POST',
			headers: {'Content-type': 'application/json'},
			body: {
				firstName: firstName,
				lastName: lastName,
				mobileNo: mobNum,
				address: {
					street: street,
					city: city,
					province: province,
					country: country,
					postalCode: postalCode
				},
				email: email,
				password: password1
			}
		})
		.then(result => result.json())
		.then(data => {
			if(data === false){
				Swal2.fire({
					title: 'Registration failed',
					icon: 'error',
					text: 'Email is already taken. Please try a different email or log in.'
				})
			} else {
				Swal2.fire({
					title: 'Successfully Registered',
					icon: 'success',
					text: 'Welcome to Grocer!'
				})
				navigate('/login');
			}
		})
	}
	return (
		(user.id === null) ?
		<Container className = 'mt-5'> 
			<Row>
				<Col className = 'col-10 col-lg-6 mx-auto'>
					<h1 className = 'text-center'>Register</h1>
					<Form onSubmit={register}>
						<FloatingLabel className="mb-3 text-secondary" controlId="formFirstName" label='First Name'>
						  <Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange = {event => setFirst(event.target.value)}/>
						</FloatingLabel>
						<FloatingLabel className="mb-3 text-secondary" controlId="formLastName" label = 'Last Name'>
						  <Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange = {event =>	setLast(event.target.value)}/>
						</FloatingLabel>
						<FloatingLabel className="mb-3 text-secondary" controlId="formMobNumb" label ='Mobile Number'>
						  <Form.Control type="text" placeholder="Enter Mobile Number" value={mobNum} onChange = {event => setMob(event.target.value)}/>
						</FloatingLabel>
						<InputGroup className="mb-3 text-secondary">
							<FloatingLabel label = 'Street'>
						        <Form.Control
						          placeholder="Street"
						          value={street} 
						          onChange = {event => setStreet(event.target.value)}
						        />
						    </FloatingLabel>
						    <FloatingLabel label='City'>
						    	<Form.Control
						    	  placeholder="City"
						    	  value={city} 
						          onChange = {event => setCity(event.target.value)}
						    	/>
						    </FloatingLabel>
						    <FloatingLabel label='Province'>
						    	<Form.Control
						    	  placeholder="Province"
						    	  value={province} 
						          onChange = {event => setProvince(event.target.value)}
						    	/>
						    </FloatingLabel>
						</InputGroup>
						<Row className ='mb-3 text-secondary'>
							<InputGroup>
						        <Col xs={7}>
						        	<FloatingLabel label='Country'>
						          		<Form.Control placeholder="Country"
						          		value={country} 
						          		onChange = {event => setCountry(event.target.value)}/>
						          	</FloatingLabel>
						        </Col>
						        <Col>
						        	<FloatingLabel label='Postal'>
						          		<Form.Control placeholder="Postal Code"
						          		value={postalCode} 
						          		onChange = {event => setPostal(event.target.value)}/>
						          	</FloatingLabel>
						        </Col>
						    </InputGroup>
						</Row>

					    <FloatingLabel className="mb-3 text-secondary" controlId="formBasicEmail" label='Email Address'>
					      <Form.Control type="email" placeholder="Enter email" value={email} onChange = {event =>	setEmail(event.target.value)}/>
					     </FloatingLabel>
					     <FloatingLabel className="mb-3 text-secondary" controlId="formBasicPassword" label = 'Password'>
					      <Form.Control type="password" placeholder="Password" value = {password1} onChange = {event => setPassword1(event.target.value)}/>
					    </FloatingLabel>
					    <FloatingLabel className="mb-3 text-secondary" controlId="formBasicPassword" label = 'Confirm Password'>
					      <Form.Control type="password" placeholder="Retype your password" value = {password2} onChange = {event => setPassword2(event.target.value)} />
					    </FloatingLabel>
					    <p>Have an account already? <Link to = '/login'>Log in here</Link>.</p>
					    <Button variant="dark" type="submit" disabled = {isDisabled}>
					        Submit
					    </Button>
					    </Form>
				</Col>
			</Row>
		</Container>
		:
		<Navigate to ='*'/>
		)
}