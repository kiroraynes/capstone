import {Row, Col, Button, Container, Table, Form} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import Swal2 from 'sweetalert2';
import UserContext from '../UserContext.js'

export default function CartTile(props){
	const [name, setName] = useState('');
	const [quantity, setQuantity] = useState(props.props.quantity);
	const {quant, setQuant} = useContext(UserContext);
	const [price, setPrice] = useState(props.props.subtotal);
	const [pic, setPic] = useState('');

	function handleQuantityChange(event){
		event.preventDefault();

		setQuantity(quantity);
	}

	function handleIncreaseQuantity(event){
		event.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/cart/in/${props.props.productId}`,{
			method: 'PATCH',
			headers:{'Content-type':'application/json',Authorization:`Bearer ${localStorage.getItem('token')}`}
		})
		.then(result=> result.json())
		.then(data => {
			if(data){
				setQuantity(quantity+1);
				Swal2.fire({
						title:'Changed',
						icon: 'success',
						text: 'Quantity Increased'
					})
			} else {
				Swal2.fire({
					title:'Error',
					icon: 'error',
					text: 'There was an error changing quantity'
				})
			}
		})
	}

	function handleDecreaseQuantity(event){
		event.preventDefault();

		if (quantity > 1){
			fetch(`${process.env.REACT_APP_API_URL}/cart/dec/${props.props.productId}`,{
				method: 'PATCH',
				headers:{'Content-type':'application/json',Authorization:`Bearer ${localStorage.getItem('token')}`}
			})
			.then(result=> result.json())
			.then(data => {
				if(data){
					setQuantity(quantity-1);
					Swal2.fire({
						title:'Changed',
						icon: 'success',
						text: 'Quantity Increased'
					})
				} else {
					Swal2.fire({
						title:'Error',
						icon: 'error',
						text: 'There was an error changing quantity'
					})
				}
			})
		} else {
			fetch(`${process.env.REACT_APP_API_URL}/cart/${props.props.productId}`, {
				method: 'DELETE',
				headers: {'Content-type':'application/json', Authorization: `Bearer ${localStorage.getItem('token')}`}
			})
			.then(result => result.json())
			.then(data => {
				if(data){
					setQuantity(quantity-1);
					Swal2.fire({
						title:'Removed',
						icon: 'success',
						text: 'Product removed from cart.'
					})
				} else {
					Swal2.fire({
						title:'Error',
						icon: 'error',
						text: 'There was an error changing quantity'
					})
				}
			})
		}
		
	}

	useEffect(()=>{
		fetch(`${process.env.REACT_APP_API_URL}/products/${props.props.productId}`, {
			method: 'GET',
			headers: {'Content-type': 'application/json'}
			})
			.then(result => result.json())
			.then(result => {
				if(result){
					setName(result.name);
					setPic(result.pic);
				}
			})
	},[])

	useEffect(()=>{
		fetch(`${process.env.REACT_APP_API_URL}/cart/view`, {
			method:'GET',
			headers: {'Content-type':'application/json', Authorization:`Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(result => result.json())
		.then(data => {
			let i = data.products.findIndex((product) => product.productId === props.props.productId);
			if(data){
				setQuant(quantity);
				if(quantity !== 0){
					setPrice(data.products[i].subtotal.toFixed(2))
				}
			}
		})
	},[quantity])

	return (
		<tr>
			<td style={{'textAlign': 'center', 'verticalAlign':'center'}}><img
			src={pic}
			width='100'
			height='auto'
			fluid
			className='enlarge-on-hover product-image justify-content-center'
		/></td>
			<td style={{'verticalAlign':'middle'}}>{name}</td>
			<td style={{'verticalAlign':'middle'}}>
				<Container>
					<Row>
								<Col xs={12} md={{span:1}} lg={{span:1}} className='mx-1'>
									<div className='d-flex justify-content-center align-items-center h-100'>
						            <img as = {Button}
						        		src={require('../images/minus.png')}
						        		width='auto'
						        		height='28em'

						              
						              onClick={handleDecreaseQuantity}
						            />
						            </div>
						        </Col>
						        <Col xs={12} md={{span:9}} lg={{span:4}} className='mx-1 my-1 align-items-center'>
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
						        <Col xs={12} md={{span:1}} lg={{span:1}} className='mx-1'>
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
			</td>
			<td style={{'verticalAlign':'middle'}}>${price}</td>
		</tr>
		)
}