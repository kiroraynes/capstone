import {Row, Col, Button, Container, Table, Form} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import Order from '../components/Order.js';
import UserContext from '../UserContext.js';
import Swal2 from 'sweetalert2';
import {useParams} from 'react-router-dom';

export default function OrderView(){
	let orderId = useParams();
	const [product, setProduct] = useState([]);
	const [total, setTotal] = useState(0);
	
	useEffect(()=>{
		fetch(`${process.env.REACT_APP_API_URL}/orders/view/${orderId.orderId}`, {
			method:'GET',
			headers: {'Content-type':'application/json', Authorization:`Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(result => result.json())
		.then(data => {
			if(data){
				setTotal(data.totalAmount.toFixed(2));
				setProduct(data.products.map((i) => {
					return(
						<Order key = {i.productId} props={i}/>
						)
				}))
				
			}
		})
	},[])

	return (
		<Container className='mt-1'>
			<Row>
				<Col lg={8} className='mx-auto'>
					<h1 className='fs-2'>Order #{orderId.orderId}</h1>
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