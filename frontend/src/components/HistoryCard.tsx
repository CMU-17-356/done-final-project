import { FunctionComponent } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export interface HistoryCardProps {
  _id: string;
  name: string;
  date: Date;
  description: string;
  image: string;
}



export default function ImgMediaCard() {
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
      <Card.Title>Task Title</Card.Title>
      <Card.Text>
        watered flowers
      </Card.Text>
      <Button variant="primary">For more details</Button>
    </Card.Body>
  </Card>
  );
}