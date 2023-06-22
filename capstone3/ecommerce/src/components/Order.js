import {Row, Col, Button, Container, Table, Form} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import Swal2 from 'sweetalert2';
import UserContext from '../UserContext.js'

export default function Order(props){
	const [name, setName] = useState('');
	const [quantity, setQuantity] = useState(props.props.quantity);
	const [price, setPrice] = useState(props.props.subtotal);
	const [pic, setPic] = useState('');


	useEffect(()=>{
		fetch(`${process.env.REACT_APP_API_URL}/products/${props.props.productId}`, {
			method: 'GET',
			headers: {'Content-type': 'application/json'}
			})
			.then(result => result.json())
			.then(result => {
				console.log(result)
				if(result){
					setName(result.name);
					setPic(result.pic);
				}
			})
	},[])

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
				{quantity}
			</td>
			<td style={{'verticalAlign':'middle'}}>${price.toFixed(2)}</td>
		</tr>
		)
}