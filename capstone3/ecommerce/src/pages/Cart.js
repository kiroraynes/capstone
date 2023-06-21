import {Row, Col, Button, Container, Table, Form} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import CartTile from '../components/CartTile.js';
import UserContext from '../UserContext.js';

export default function Cart(){
	const {quant, setQuant} = useContext(UserContext);
	const [product, setProduct] = useState([])
	const [total, setTotal] = useState(0);
	useEffect(()=>{
		fetch(`${process.env.REACT_APP_API_URL}/cart/view`, {
			method:'GET',
			headers: {'Content-type':'application/json', Authorization:`Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(result => result.json())
		.then(data => {
			console.log(data)
			if(data){
				setTotal(data.total);
				setProduct(data.products.map((i) => {
					return(
						<CartTile key = {i.productId} props={i} />
						)
				}))
				
			}
		})
	},[quant])

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
					        	<td colSpan={4} style={{'textAlign': 'right'}}><Button variant="dark" className='fw-semibold mx-1'>Place Order</Button></td>
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