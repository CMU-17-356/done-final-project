import { FunctionComponent } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export interface HistoryCardProps {
  _id: string;
  name: string;
  date: string;
  description: string;
  image: string;

}

const HistoryCard: FunctionComponent<HistoryCardProps> = (props: HistoryCardProps) => {
  return (
    <Card style={{ width: '12rem' }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title style={{ color: 'black' }}>{props.name}</Card.Title>
        <Card.Text style={{ color: 'black' }}>
          {props.description}
        </Card.Text >
        <Card.Text style={{ color: 'black' }}>
          {props.date}
        </Card.Text >
        
      </Card.Body>
    </Card>
  );
}

export default HistoryCard;