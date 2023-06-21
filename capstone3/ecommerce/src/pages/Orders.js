import {Row, Col, Button, Container, Table, Form} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import OrderView from '../pages/OrderView.js';
import Swal2 from 'sweetalert2';
import {useParams} from 'react-router-dom';

export default function Orders(){
	const [orders, setOrders] = useState([]);

	
	useEffect(()=>{
		fetch(`${process.env.REACT_APP_API_URL}/orders/viewAll`, {
			method:'GET',
			headers: {'Content-type':'application/json', Authorization:`Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(result => result.json())
		.then(data => {
			if(data){
				setOrders(data.map((i) => {
					setOr(i._id);
					return(
						<Col lg={12} className='mx-auto'><OrderView props={or}/></Col>
						)
				}))
				
			}
		})
	},[])

	return (
		<Container className='mt-5'>
			<Row>
				{orders}
			</Row>
		</Container>
		)
}