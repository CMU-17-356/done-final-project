import { FunctionComponent } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

<<<<<<< HEAD

=======
>>>>>>> 03e894ed80a9c17b6cc62a4702329857742b70cc
export interface HistoryCardProps {
  _id: string;
  name: string;
  date: string;
  description: string;
  image: string;
}

<<<<<<< HEAD


=======
>>>>>>> 03e894ed80a9c17b6cc62a4702329857742b70cc
const HistoryCard:FunctionComponent<HistoryCardProps>=(props:HistoryCardProps) => {
  return (
    <Card style={{ width: '12rem' }}>
    <Card.Img variant="top" src="image" />
    <Card.Body>
      <Card.Title style={{ color: 'black' }}>{props.name}</Card.Title>
      <Card.Text style={{ color: 'black' }}>
        {props.description}
        </Card.Text >
        <Card.Text style={{ color: 'black' }}>
        {props.date}
      </Card.Text >
      <Button variant="primary">For more details</Button>
    </Card.Body>
  </Card>
  );
}

export default HistoryCard;