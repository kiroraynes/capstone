import {Container, Row, Col, Button,Form} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import Swal2 from 'sweetalert2';
import UserContext from '../UserContext.js';

export default function ProductView(){
	const [prodName, setProd] = useState('');
	const [description, setDec] = useState('');
	const [category, setCat] = useState('');
	const [price,setPrice] = useState('');
	const [pic,setPic] = useState('');
	const [stock, setStock] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	const {user} = useContext(UserContext);

	const [quantity, setQuantity] = useState(0);
	const navigate = useNavigate();
	const {productId} = useParams();

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
			method: 'GET',
			headers: {'Content-type': 'application/json'}
		})
		.then(result => result.json())
		.then(data => {
			if(data){
				setProd(data.name);
				setDec(data.description);
				setCat(data.category);
				setPrice(data.price);
				setPic(data.pic);
				setStock(data.stock);
			} else {
				navigate('/*');
			}
		})
	}, [])

	function handleQuantityChange(event){
		event.preventDefault();

		setQuantity(quantity);
	}

	function handleIncreaseQuantity(event){
		event.preventDefault();

		setQuantity(quantity+1);
	}

	function handleDecreaseQuantity(event){
		event.preventDefault();

		if(quantity !== 0){
			setQuantity(quantity-1);
		}
	}

	function addToCart(event){
		event.preventDefault();
		console.log('Add to cart invoked!')

		if(user.id){
			fetch(`${process.env.REACT_APP_API_URL}/user/addCart`, {
				method: 'POST',
				headers: {'Content-type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}`},
				body: JSON.stringify({
					productId: productId,
					quantity: quantity
				})
			})
			.then(result => result.json())
			.then(data => {
				if(data){
					Swal2.fire({
						title: 'Success',
						icon: 'success',
						text: 'Added to Cart!'
					})
				} else {
					Swal2.fire({
						title: 'Error',
						icon: 'error',
						text: 'Please try again.'
					})
				}
			})
		} else {
			navigate('/login');
		}

		
	}

	return (
		
			<Container className='mx-auto mt-5'>
				<Row>
					<Col xs={{span:12}} md={{span:12}} lg={{ span: 7}}>
						<img
							src={pic}
							width='100%'
							height='auto'
							fluid
							className='enlarge-on-hover product-image justify-content-center'
						/>
					</Col >
					<Col xs={{span:12}} md={{span:12}} lg={{ span: 5}} className='my-4'>
						<Link className='go-back-link' to='/products'>Go back to products</Link>
						<h2>{prodName}</h2>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
						<h4>Description</h4>
						<p>{description}</p>
								<Container className='px-0'>
									<Row>
										<Col xs={12} md={12} lg={{span:12}} className='justify-content-start'>
										            <Form.Label>Quantity</Form.Label>
										            <p>Stock: {stock}</p>
										</Col>
										<Col xs={12} md={12} lg={{span:12}}>
											<Container className='px-0 '>
												<Row className='justify-content-center justify-content-lg-start'>
													<Col xs={1} md={{span:1}} lg={{span:1}} className='mx-1'>
														<div className='d-flex justify-content-center align-items-center h-100'>
											            <img as = {Button}
											        		src={require('../images/minus.png')}
											        		width='auto'
											        		height='28em'

											              
											              onClick={handleDecreaseQuantity}
											            />
											            </div>
											        </Col>
											        <Col xs={8} md={{span:9}} lg={{span:4}} className='mx-1 align-items-center'>
											        	<div className=''>
											        	<Form.Group className='mb-3'>
											            <Form.Control
											              type='number'
											              min={0}
											              value={quantity}
											              onChange={handleQuantityChange}
											              className='quantity-input'
											            />
											            </Form.Group>
											        	</div>
											        </Col>
											        <Col xs={1} md={{span:1}} lg={{span:1}} className='mx-1'>
											        	<div className='d-flex justify-content-center align-items-center h-100'>
											            <img as = {Button}
											        		src={require('../images/add.png')}
											        		width='auto'
											        		height='30em'
											              
											              onClick={handleIncreaseQuantity}
											            />
											            </div>
											        </Col>
										        </Row>
										    </Container>
										            
										</Col>
										<Col xs={12} md={12} lg={{span:7}} className=''>
											<div className='mx-auto'>
												<Button
												variant='dark'
											    className='fw-semibold mx-1'
											    style={{ width: '100%' }}
											    onClick={addToCart}>
											    Add to Cart
											</Button>
											</div>
										</Col>
									</Row>
								</Container>
					</Col>
				</Row>
			</Container>
		
		)
}
