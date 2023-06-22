import {Container, Row, Col, Button,Form, Image} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import Swal2 from 'sweetalert2';

export default function Home(){

	return (
		<>
			<Container>
				<Row>
					<Col className='justify-content-center'>
						<div className='bg-dark p-5 rounded shadow'>
							<Container>
								<Row className='align-items-center'>
									<Col xs={12} md={6} lg={6} className=''>
										<Container>
											<Row>
												<Col lg={6}>
													<div className='bg-secondary rounded-pill p-2'><h5 className='text-center fs-6 fw-light text-light object-fit-scale'>Choose Wisely, Choose Grocer</h5></div>
												</Col>
											</Row>
										</Container>
										<h1 className='text-center text-light'>Start Your Day <span className='text-'>Fresh With Us!</span></h1>
									</Col>
									<Col xs={12} md={6} lg={6} className='center-image'>
										<Image src={require('../images/icon.png')} className='banner-image object-fit-scale' fluid/>
									</Col>
								</Row>
							</Container>
						</div>
					</Col>
				</Row>
			</Container>
		</>
		)
}