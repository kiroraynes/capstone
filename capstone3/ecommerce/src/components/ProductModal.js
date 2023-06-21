import {Row, Col, Button, Modal, Form, FloatingLabel, InputGroup} from 'react-bootstrap';
import {useState, useContext, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Swal2 from 'sweetalert2';
let categories = ['Beverages', 'Bread/Bakery', 'Canned','Dairy','Dry/Baking Goods','Frozen Foods','Meat','Produce','Cleaners','Paper Goods','Personal Care'];



export default function ProductModal({show, handleClose}){
	const [prodName, setProd] = useState('');
	const [description, setDec] = useState('');
	const [category, setCat] = useState('');
	const [price,setPrice] = useState('');
	const [pic,setPic] = useState('');
	const [stock, setStock] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);
	const navigate = useNavigate();

	const [cate, setCate] = useState([])
	
	useEffect(() => {
		if (prodName!== '' && description!== '' && category !== '' && price!== '' && pic !=='' && stock !== '') {
			
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	},[category,prodName,description,price, pic,stock])
	useEffect(()=>{
		setCate(categories.map(i => {
			return (
				<option key={i}value={i}>{i}</option>
				)
		}))
	},[])

	/*useEffect(()=>{
		console.log(prodName);
		console.log(description);
		console.log(category);
		console.log(price);
		console.log(pic);
		console.log(stock);
	},[category,prodName,description,price, pic,stock])*/

	const add = (event) => {
		event.preventDefault();
		fetch(`${process.env.REACT_APP_API_URL}/products/create`, {
			method: 'POST',
			headers: {'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
			body: JSON.stringify({
				name: prodName,
				description: description,
				category: category,
				price: price,
				pic: pic,
				stock: stock
			})
		})
		.then(result => result.json())
		.then(data => {
			if (data===false){
				Swal2.fire({
					title: 'Oops',
					icon: 'error',
					text: 'Error encountered. Please try adding again'
				})
			} else {
				Swal2.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product has been added'
				});
				handleClose();
			}
			setTimeout(()=>{
				navigate('/dashboard')
			},4000)
		})
	}
	return (
		<>
		    <Modal show={show} onHide={handleClose}>
		    	<Modal.Header closeButton>
		          <Modal.Title>Add Product</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>
		        	<Form onSubmit={add}>
		        		<FloatingLabel className="mb-3 text-secondary" controlId="formProdName" label='Product Name'>
		        		  <Form.Control type="text" placeholder="Enter Product Name" value={prodName} onChange = {event => setProd(event.target.value)}/>
		        		</FloatingLabel>
		        	
		        		<FloatingLabel className="mb-3 text-secondary" controlId="formDescrip" label ='Description'>
		        		  <Form.Control type="text" placeholder="Enter Description" value={description} onChange = {event => setDec(event.target.value)}/>
		        		</FloatingLabel>
		        		<FloatingLabel className="mb-3 text-secondary" controlId="formCat" label ='Category'>
		        		  {/*<Form.Control type="text" placeholder="Enter Description" value={category} />*/}
		        		  <select className="form-select" value ={category} onChange= {(event) => {setCat(event.target.value);}}>
		        		    <option value=''>Select Category</option>
		        		    {cate}
		        		  </select>
		        		</FloatingLabel>
		        		<FloatingLabel className="mb-3 text-secondary" controlId="formPrice" label ='Price'>
		        		  <Form.Control type="text" placeholder="Enter Description" value={price} onChange = {event => setPrice(event.target.value)}/>
		        		</FloatingLabel>
		        		<FloatingLabel className="mb-3 text-secondary" controlId="formPic" label ='Picture'>
		        		  <Form.Control type="text" placeholder="Enter Description" value={pic} onChange = {event => setPic(event.target.value)}/>
		        		</FloatingLabel>
		        		<InputGroup className="mb-3 text-secondary">
		        			<FloatingLabel label = 'Stock'>
		        		        <Form.Control
		        		          placeholder="Stock"
		        		          value={stock} 
		        		          onChange = {event => setStock(event.target.value)}
		        		        />
		        		    </FloatingLabel>
		        		    
		        		</InputGroup>
		        		
		        		<Button type = 'submit' variant="dark" disabled = {isDisabled}>
		        		  Submit
		        		</Button>		        	    
		        	</Form>
		        </Modal.Body>
		        <Modal.Footer>
		          <Button variant="dark" onClick={handleClose}>
		            Close
		          </Button>
		        </Modal.Footer>
		    </Modal>
		</>
		)
}
