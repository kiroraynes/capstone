import {Row, Col, Button, Container, Table, Form} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import CartTile from '../components/CartTile.js';
import UserContext from '../UserContext.js';
import Swal2 from 'sweetalert2';
import {useNavigate} from 'react-router-dom';

export default function Cart(){
	const {quant, setQuant} = useContext(UserContext);
	const [product, setProduct] = useState([])
	const [total, setTotal] = useState(0);
	const navigate = useNavigate();

	useEffect(()=>{
		fetch(`${process.env.REACT_APP_API_URL}/cart/view`, {
			method:'GET',
			headers: {'Content-type':'application/json', Authorization:`Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(result => result.json())
		.then(data => {
			if(data){
				setTotal(data.total.toFixed(2));
				setProduct(data.products.map((i) => {
					return(
						<CartTile key = {i.productId} props={i} />
						)
				}))
				
			} else {
				Swal2.fire({
						title:'Error',
						icon: 'error',
						text: 'There was an error viewing cart.'
				})
			}
		})
	},[quant])

	function order(event){
		event.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/orders/placeOrder`, {
			method: 'POST',
			headers: {'Content-type':'application/json', Authorization:`Bearer ${localStorage.getItem('token')}`}
		})
		.then(result => result.json())
		.then(data => {
			console.log(data)
			if(data.response) {
				Swal2.fire({
					title:'Order Placed',
					icon: 'success',
					text: 'Your order is on the way!'
				})
				navigate(`/order/${data.id}`);
			} else {
				Swal2.fire({
						title:'Error',
						icon: 'error',
						text: 'There was an error placing order'
				})
			}
		})
	}

	return (
		<Container className='mt-5'>
			<Row>
				<Col lg={8} className='mx-auto'>
					<h1>Your Cart</h1>
					<Table >
					      <thead>
					        <tr>
					        	<th></th>
					          <th>Product</th>
					          <th>Quantity</th>
					          <th>Subtotal</th>
					        </tr>
					      </thead>
					      <tbody>
					        {product}
					        <tr>
					        	<td colSpan={3} style={{'textAlign': 'right','fontWeight':'bold'}}>Total</td>
					        	<td style={{'fontWeight':'bold'}}>${total}</td>
					        </tr>
					        <tr>
					        	<td colSpan={4} style={{'textAlign': 'right'}}><Button variant="dark" className='fw-semibold mx-1' onClick={order}>Place Order</Button></td>
					        </tr>
					      </tbody>
					    </Table>
				</Col>
			</Row>
			<Row className=''>
				<Col lg={8} className='d-flex justify-content-end'>
					
				</Col>
			</Row>
		</Container>
		)
}