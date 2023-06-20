import {Link} from 'react-router-dom';
import {Container, Row, Col, Card} from 'react-bootstrap';

export default function PageNotFound(){
	return (
		<>
			<Container className='text-center'>
				<Row>
					<Col className='col-12 col-lg-6 mx-auto'>
						<img src={require('../images/404.jpg')} height = '400' width='400'/>
						<p>Go back to the <a href='/'>homepage</a>.</p>
					</Col>
				</Row>
			</Container>
		</>
		)
}