import {Container, Row, Col, Button, Form, Card} from 'react-bootstrap';

export default function AdminProductTile(props){
	const {name, description, category, price, pic, stock} = props.prodProp;
	return(
			<Col className = 'col-10 col-lg-4 mb-3'>
					<Card className='productCard'>
					      <Card.Img className="custom-card-img" variant="top" src={pic} />
					      <Card.Body>
					        <Card.Title>{name}</Card.Title>
					        <Card.Text>
					          {description}
					        </Card.Text>
					        <Container className='text-center'>
					        	<Row >
					        		<Col className=''>
					        			<Button variant="outline-success" className='mx-1'>Edit</Button><Button variant="outline-danger" className='mx-1'>Delete</Button>
					        		</Col>
					        	</Row>				        	
					        </Container>
					      </Card.Body>
					    </Card>
		    	</Col>
		)
}