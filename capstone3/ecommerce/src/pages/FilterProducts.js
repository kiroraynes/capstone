import {Container, Row, Col, Button, Form, } from 'react-bootstrap';
import {useState, useEffect} from 'react';
import ProductTile from '../components/ProductTile.js';
import {useParams} from 'react-router-dom';

export default function FilterProducts(){
	const [products, setProduct] = useState([]);
	const {cat} = useParams();

	useEffect(()=>{
		fetch(`${process.env.REACT_APP_API_URL}/products/category/${cat}`, {
			method: 'GET',
			headers: {'Content-type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}`}
		})
		.then(result => result.json())
		.then(data => {
			setProduct(data.map(prod => {
				return (
					<ProductTile key = {prod._id} prodProp = {prod} />
					)
			}))
		})
	},[])
	return (
		<>
			<Container className='mt-5 col-12 col-lg-10 mx-auto'>
				<Row className="justify-content-center">
					{products}
				</Row>
			</Container>
		</>
		)
}