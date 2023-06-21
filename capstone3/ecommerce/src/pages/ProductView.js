import {Container, Row, Col, Button,Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import Swal2 from 'sweetalert2';

export default function ProductView(){
	const [prodName, setProd] = useState('');
	const [description, setDec] = useState('');
	const [category, setCat] = useState('');
	const [price,setPrice] = useState('');
	const [pic,setPic] = useState('');
	const [stock, setStock] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	const [quantity, setQuantity] = useState(0);
	const navigate = useNavigate();
	const productId = useParams();
	console.log(productId)

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId.productId}`, {
			method: 'GET',
			headers: {'Content-type': 'application/json'}
		})
		.then(result => result.json())
		.then(data => {
			console.log(`${process.env.REACT_APP_API_URL}/products/${productId}`)
			console.log(data)
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

		setQuantity(quantity-1);
	}

	return (
		
			<Container className='mx-auto mt-5'>
				<Row>
					<Col xs={{span:12}} md={{span:6}} lg={{ span: 6}}>
						<img
							src={pic}
							width='auto'
							height='600'
							fluid
							className='enlarge-on-hover product-image'
						/>
					</Col >
					<Col xs={{span:12}} md={{span:6}} lg={{ span: 6}}>
						<Link to='/products'>Go back to products</Link>
						<h2>{prodName}</h2>
						<h4>Description</h4>
						<p>{description}</p>
						<Form.Group className='mb-3'>
						<Container className='px-0'>
						<Row>
						<Col lg={{span:6}} className='justify-content-start'>
						            <Form.Label>Quantity</Form.Label>
						</Col>
						<Col lg={{span:8}}>
							
						            <Button
						              variant='outline-dark'
						              className='quantity-button'
						              onClick={handleDecreaseQuantity}
						            >
						              -
						            </Button>
						            <Form.Control
						              type='number'
						              min={0}
						              value={quantity}
						              onChange={handleQuantityChange}
						              className='quantity-input'
						            />
						            <Button
						              variant='outline-dark'
						              className='quantity-button'
						              onClick={handleIncreaseQuantity}
						            >
						              +
						            </Button>
						            
						</Col>
						</Row>
						</Container>
						</Form.Group>
						<Button
							variant='dark'
						    className='fw-semibold mx-1 btn-outline-dark custom-button'>
						    Add to Cart
						</Button>

					</Col>
				</Row>
			</Container>
		
		)
}
