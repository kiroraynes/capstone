import {Container, Row, Col, Button, Form, } from 'react-bootstrap';
import {useState, useEffect} from 'react';
import AdminProductTile from './AdminProductTile.js';

export default function AdminProduct(){
	const [products, setProduct] = useState([]);

	useEffect(()=>{
		fetch(`${process.env.REACT_APP_API_URL}/products/allProducts`, {
			method: 'GET',
			headers: {'Content-type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}`}
		})
		.then(result => result.json())
		.then(data => {
			setProduct(data.map(prod => {
				return (
					<AdminProductTile key = {prod._id} prodProp = {prod} />
					)
			}))
		})
	},[])
	return (
		<>
			<Container className='mt-5 col-10 mx-auto'>
				<Row>
					{products}
				</Row>
			</Container>
		</>
		)
}