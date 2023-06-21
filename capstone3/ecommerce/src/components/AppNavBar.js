import {Row, Col, Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas} from 'react-bootstrap'
import UserContext from '../UserContext.js';
import {useContext} from 'react';
import {Link, NavLink} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

let categories = ['Beverages', 'Bread/Bakery', 'Canned','Dairy','Dry/Baking Goods','Frozen Foods','Meat','Produce','Cleaners','Paper Goods','Personal Care'];

export default function AppNavBar(){
	const {user} = useContext(UserContext);

	

	return (
		<>
			<Navbar expand='lg' className="fixed-top bg-body-tertiary mb-3 shadow p-3 bg-white rounded fs-5">
			          <Container fluid className='mx-md-5'>
			            <Navbar.Brand href="#" className = 'fw-semibold'>
			            <img
				            alt=""
				            src={require('../images/logo.png')}
				            width="30"
				            height="30"
				            className="d-inline-block align-top"
            			/>{' '}
            				Grocer
            			</Navbar.Brand>
			            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
			            <Navbar.Offcanvas
			              id={`offcanvasNavbar-expand-lg`}
			              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
			              placement="end"
			            >
			              <Offcanvas.Header closeButton>
			               
			              </Offcanvas.Header>
			              <Offcanvas.Body>
			              <Container fluid>
							<Row className='align-items-center'>
							<Col xs={{span:12, order: 3}} md={{span:8, order: 3}} lg={{ span: 8, order: 1 }} className='align-items-center'>
				                <Nav className="justify-content-center flex-fill">
				                  <Nav.Link href="#action1" className = "fw-semibold">Home</Nav.Link>
				                  <Nav.Link href="#action2" className = "fw-semibold">What We Offer</Nav.Link>
				                  <Nav.Link href="/products" className = "fw-semibold">Products</Nav.Link>
				                  <NavDropdown
				                    title="Categories"
				                    id={`offcanvasNavbarDropdown-expand-lg`} className = "fw-semibold"
				                  >
				                  {
				                  	categories.map(cat => {
				                  					return (
				                  						<NavDropdown.Item href = {`action-${cat}`}>{cat}</NavDropdown.Item>
				                  						)
				                  				})
				                  }
				                  </NavDropdown>
				                </Nav>
			                </Col>
			                
			                <Col xs={{span:12, order: 2}} md={{span:8, order: 2}} lg={{ span: 3, order: 2 }} className='px-0'>
			                <Form className='d-flex'>
			                  <Form.Control
			                    type="search"
			                    placeholder="Search"
			                    className="me-2"
			                    aria-label="Search"
			                	/>

			               		<Button variant="outline-dark btn-outline-dark">
			                	<img
							    alt=""
							    src={require('../images/search.png')}
							    width="35"
							    height="35"
							    className="d-inline-block align-top"
								/>
								</Button>
			                	</Form>
							</Col>
							<Col xs={{span:12, order: 1}} md={{span:4, order: 1}} lg={{ span: 1, order: 3 }} className="justify-content-end my-2 px-0">
			                {
			                	user.id === null ?
			                	<Button id = 'profile' as = {NavLink} to = '/login' variant="outline-dark" className = 'mx-2'>
			                		<img
			                			src={require('../images/user.png')}
			                			width='auto'
			                			height='35'
			                		/>
			                	</Button>
			                	:
			                	<Dropdown id = 'profile'>
			                		<Dropdown.Toggle variant="outline-dark btn-outline-dark" id="dropdown-basic" className='mx-2'>
			                		        <img
			                		        	src={require('../images/user.png')}
			                		        	width='auto'
			                		        	height='35'
			                		        	fluid
			                		        />
			                		</Dropdown.Toggle>
			                		<Dropdown.Menu>
				                	    <Dropdown.Item href="#/action-1">View Profile</Dropdown.Item>
				                	    <Dropdown.Item as = {Link} to ='/logout'>Logout</Dropdown.Item>
			                	    </Dropdown.Menu>
			                	</Dropdown>
			                }
			                </Col>
			                </Row>
			                </Container>
			              </Offcanvas.Body>
			            </Navbar.Offcanvas>
			          </Container>
			        </Navbar>
		</>
		)
}