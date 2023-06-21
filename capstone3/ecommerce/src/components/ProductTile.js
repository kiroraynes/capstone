import {Card, Col, Container, Row, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default function ProductTile(props){
	const {_id, name, description, category, price, pic, stock, isActive} = props.prodProp;
	return (
		<Col className='col-10 col-lg-4 mb-3'>
			<Card className='productCard'>
			      <div className='img-container'>
			      	<Card.Img className="custom-card-img" variant="top" src={pic} />
			      </div>
			      <Card.Body>
			        <Card.Title>{name}</Card.Title>
			        <Card.Text>
			          {description}
			        </Card.Text>
			        <Card.Subtitle className='mb-3'>
			        	${price}
			        </Card.Subtitle>
			        <Container className='text-center'>
			        	<Row >
			        		<Col className='d-flex'>
			        			<Button as = {Link} to ={`/productView/${_id}`} variant="dark" className='fw-semibold mx-1 btn-outline-dark flex-grow-1' >Details</Button>
			        		</Col>
			        	</Row>				        	
			        </Container>
			      </Card.Body>
			    </Card>
		</Col>
		)
}