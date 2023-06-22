import Container from 'react-bootstrap/Container';
import {Button} from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ProductModal from './ProductModal.js';
import {useState} from 'react';


export default function DashNav(){
	const [showModal, setShowModal] = useState(false);

	  const handleOpenModal = () => {
	    setShowModal(true);
	  };

	  const handleCloseModal = () => {
	    setShowModal(false);
	  };
	return (
		<>
			<h1 className='text-center'>Admin Dashboard</h1>
			<Navbar bg="light" data-bs-theme="dark">
			        <Container className = 'justify-content-center'>
			          <Nav>
			            <Button className = 'mx-3' onClick={handleOpenModal}>Add Product</Button>
			            <ProductModal show={showModal} handleClose={handleCloseModal}/>
			            <Button as = {NavLink} to="/adminorders" className	= 'mx-3'>Users' Orders</Button>
			          </Nav>
			        </Container>
			 </Navbar>
		</>
		)
}