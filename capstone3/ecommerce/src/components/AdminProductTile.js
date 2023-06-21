import {Container, Row, Col, Button, Card} from 'react-bootstrap';
import {useState} from 'react';
import AdminProductUp from './AdminProductUp.js';
import Swal2 from 'sweetalert2';

export default function AdminProductTile(props){
	const {_id, name, description, category, price, pic, stock, isActive} = props.prodProp;
	const temp = {
		name:name,
		desc: description,
		cat: category,
		pr: price,
		pi: pic,
		st: stock,
		isActive: isActive
	}
	const [showModal, setShowModal] = useState(false);
	const [isUnarchived, setIsUnarchived] = useState(isActive);

	  const handleOpenModal = () => {
	    setShowModal(true);
	  };

	  const handleCloseModal = () => {
	    setShowModal(false);
	  };
	function archive(event){
		event.preventDefault();

		if(isUnarchived){
			fetch(`${process.env.REACT_APP_API_URL}/products/${_id}`, {
				method: 'DELETE',
				headers: {'Content-type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}`}
			})
			.then(result => result.json())
			.then(data => {
				if (data) {
					setIsUnarchived(false);
					Swal2.fire({
						title: 'Success',
						icon:'success',
						text: 'Product Successfully Unarchived'
					});
				} else {
					Swal2.fire({
						title: 'Unarchive failed',
						icon:'error',
						text: 'Error occurred. Please try again.'
					});
				}
			})
		} else {
			fetch(`${process.env.REACT_APP_API_URL}/products/${_id}`, {
				method: 'PUT',
				headers: {'Content-type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}`}
			})
			.then(result => result.json())
			.then(data => {
				if (data) {
					setIsUnarchived(true);
					Swal2.fire({
						title: 'Success',
						icon:'success',
						text: 'Product Successfully Unarchived'
					});
				} else {
					Swal2.fire({
						title: 'Unarchive failed',
						icon:'error',
						text: 'Error occurred. Please try again.'
					});
				}
			})
		}

		
	}
	return(
			<Col className = 'col-10 col-lg-4 mb-3'>
					<Card className='productCard'>
					      <div className='img-container'>
					      	<Card.Img className="custom-card-img" variant="top" src={pic} />
					      </div>
					      <Card.Body>
					        <Card.Title>{name}</Card.Title>
					        <Card.Text>
					          {description}
					        </Card.Text>
					        <Container className='text-center'>
					        	<Row >
					        		<Col className=''>
					        			<Button variant="outline-success" className='mx-1' onClick={handleOpenModal}>Edit</Button><AdminProductUp show={showModal} handleClose={handleCloseModal} props={temp}/>{(isUnarchived === true) ? <Button variant="outline-danger" className='mx-1' onClick = {archive}>Archive</Button> : <Button variant="outline-success" className='mx-1' onClick = {archive}>Unarchive</Button>}
					        		</Col>
					        	</Row>				        	
					        </Container>
					      </Card.Body>
					    </Card>
		    	</Col>
		)
}