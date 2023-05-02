import React, { useEffect, useState } from 'react'
import HistoryCard from '../components/HistoryCard'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Dropdown from 'react-bootstrap/Dropdown';
import { getAllTasks, getTask, updateTask2, deleteTask, addTask, ITask } from '../backend-adapter'
import Button from 'react-bootstrap/Button';



//xport default ScreenreaderLabelExample;

export default function History() {
    const username = { username: 'user' };
    return (
        <div className="History">
            <h1>History</h1>
            <HistoryView username={username} />
        </div>
    );

}
interface IHistoryViewProps {
    username: { username: string };
}
const HistoryView: React.FC<IHistoryViewProps> = ({ username }) => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [completed, setCompleted] = useState<number>(0);
    const [completedTodos, completedList] = useState<ITask[]>([]);
    const [date, setMonth] = useState<Date>(new Date());
    const sameDay = (first: Date, second: Date) =>
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth();


    const movePrevious = (e): void => {
        e.preventDefault()
        setMonth(date => {
            date.setDate(date.getMonth() - 1);
            return new Date(date)
        });
        getAllTasks(username.username)
            .then((curr) => {
                completedList(curr.filter((task) => task.completed.filter((x) => sameDay(x.date, date)).length > 0))
                    ;
            })
    }

    const moveNext = (e): void => {
        e.preventDefault()
        setMonth(date => {
            date.setDate(date.getMonth() + 1);
            return new Date(date)
        });
        getAllTasks(username.username)
            .then((curr) => {
                completedList(curr.filter((task) => task.completed.filter((x) => sameDay(x.date, date)).length > 0))
                    ;
            })
    }

    return (
        <main className='HistoryView'>
            <><h1>Calendar View</h1>
                <div className="Month">
                    <Button onClick={movePrevious}>Previous</Button>
                    <h1>Month: {date.getMonth()}</h1>
                    <Button onClick={moveNext}>Next</Button>
                </div>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Month
                    </Dropdown.Toggle>

                    <Dropdown.Menu>


                        <Dropdown.Item href="#/action-1">Jan 2023</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Feb 2023</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Mar 2023</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Apr 2023</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div>
                    <HistoryCard _id={'111'} name={'water plants'} date={'2023-02-21'} description={'water three plants'} image={'/'}></HistoryCard>
                    <HistoryCard _id={'112'} name={'take supplement'} date={'2023-02-24'} description={'zinc, meg, fish oil'} image={'/'}></HistoryCard>
                    <HistoryCard _id={'113'} name={'renew credit card'} date={'2023-03-24'} description={'activate the card'} image={'/'}></HistoryCard>
                    <HistoryCard _id={'114'} name={'feed my cat'} date={'2023-03-22'} description={'10 oz'} image={'/'}></HistoryCard>

                    <div className='mt-3'>Completed: </div>
                    {/* {completedTodos.filter((todo)  => {
          if(todo.dueDate !== undefined && todo.dueDate !== null){
            if (todo.recurring === "Weekly"){
              return beforeDay(todo.createdAt,date) && beforeDay(date, todo.dueDate) && weekday[date.getDay()] === todo.day;
            }
            return beforeDay(todo.createdAt,date) && beforeDay(date, todo.dueDate);
          } else {
              if (todo.recurring === "Weekly"){
                return beforeDay(todo.createdAt,date) && weekday[date.getDay()] === todo.day;
              } else if (todo.recurring === "Daily"){
                return beforeDay(todo.createdAt,date);
              }
              return sameDay(todo.createdAt, date);
          }
    }).sort((a, b) => checkSort(a,b)).map((todo: ITodo) => (
        <HistoryCard
          _id={todo._id}
          name = {todo.name}
          date = {todo.completed[0].date}
          description = {todo.description}
          image = {'/'}
    
        />
      ))} */}
                </div>
                <text>Progress Bar</text>
                <text>Completed Tasks:{completed}</text>
                <text>Total Tasks Created:{total}</text>
                <ProgressBar now={completed / total} label={`${completed / total}%`} visuallyHidden /></>
        </main>

    )
}
