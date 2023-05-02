import React from "react"
import { useState, useEffect } from "react";
import { format } from "date-fns";
import EditTodo from '../components/EditTodo'


type Props = TodoProps & {
  updateTodo: (event: React.ChangeEvent<HTMLInputElement>, todo: ITodo) => void
  deleteTodo: (_id: string) => void
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void 
  date: Date
}

const sameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo, saveTodo, date}) => {

  let completed = todo.completed.filter((x) => sameDay(x.date,date))
  let status = (completed.length > 0)

  const checkTodo: string = status ? `line-through` : ""
  const checkDone: string = status ? `Card-done` : 'Card'
  const [showEdit, setShowEdit] = useState(false)

  // Create a reference to the hidden file input element
  const inputRef = React.useRef<HTMLInputElement>(document.createElement("input"));

  const fileUpload = () => {
    console.log(inputRef.current);
    inputRef.current.click();
  };


  if(!showEdit){
    return (
        <div className={checkDone}>
          <div className="Card--text">
            <h1 className={checkTodo}>{todo.name}</h1>
            <div className="textbox" style={{ flexShrink: 1 }}> {todo.description}</div>
            {todo.label != "" && (<div className={checkTodo}><b>Label:</b> {todo.label}</div>)}
            {todo.priority != "" && (<div className={checkTodo}><b>Priority:</b> {todo.priority}</div>)}
            {todo.dueDate != null && (<div className={checkTodo}><b>Due Date:</b> {format(todo.dueDate, "h:mm a, MMMM do yyyy")}</div>)}
            {todo.recurring == "Daily" && (<div className={checkTodo}><b>Recurring:</b> {todo.recurring}</div>)}
            {todo.recurring == "Weekly" && (<div className={checkTodo}><b>Recurring:</b> {todo.recurring} on {todo.day}</div>)}
          </div>
          <div className='Card--button'>
    
            <button onClick={fileUpload} className={status ? `hide-button` : "Card--button__done"}>Complete</button>
            <input
                style={{display: 'none'}} /* Make the file input element invisible */
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={(e) => updateTodo(e,todo)}
            />
            {status && <img className={"Card--button__done"} src={completed[0].photo} alt={todo.name} height="80px" />}
            <button
              onClick={() => setShowEdit(true)}
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="Card--button__delete"
            >
              Delete
            </button>
          </div>
        </div>
      )
  } else {
        return (<div className={checkDone}>
            <EditTodo todo={todo} saveTodo={saveTodo} clearForm={setShowEdit} />
            <div className='Card--button'>
              {/* <div onClick={() => setShowEdit(false)} >
                <button>Save Todo</button>
              </div> */}
              <button
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )
  }
  
}

export default Todo