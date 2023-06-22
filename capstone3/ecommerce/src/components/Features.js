import {Container, Row, Col, Card} from 'react-bootstrap';

export default function Features(){
	return (
		<Container >
			<Row>
				<Col className = 'col-12 col-md-4 mt-3'>
					<Card className='cardHighlight shadow'>
					      <Card.Body>
					        <Card.Title>Fast and Easy Transaction</Card.Title>
					        <Card.Text>
					          Get what you want, no questions asked.
					        </Card.Text>
					      </Card.Body>
					    </Card>
				</Col>
				<Col className = 'col-12 col-md-4 mt-3'>
					<Card className='cardHighlight shadow'>
					      <Card.Body>
					        <Card.Title>30 Min Delivery</Card.Title>
					        <Card.Text>
					          In a rush? No worries because Grocer delivers.
					        </Card.Text>
					      </Card.Body>
					    </Card>
				</Col>
				<Col className = 'col-12 col-md-4 mt-3'>
					<Card className='cardHighlight shadow'>
					      <Card.Body>
					        <Card.Title>Enjoy Rewards!</Card.Title>
					        <Card.Text>
					          Everytime you shop with us, you earn special rewards!
					        </Card.Text>
					      </Card.Body>
					    </Card>
				</Col>
			</Row>
		</Container>
		)
}