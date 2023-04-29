import React from "react"
import { useState, useEffect } from "react";
import { format } from "date-fns";
import EditTodo from '../components/EditTodo'


type Props = TodoProps & {
  updateTodo: (event: React.ChangeEvent<HTMLInputElement>, todo: ITodo) => void
  deleteTodo: (_id: string) => void
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void 
}


const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo, saveTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : ""
  const checkDone: string = todo.status ? `Card-done` : 'Card'
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
    
            <button onClick={fileUpload} className={todo.status ? `hide-button` : "Card--button__done"}>Complete</button>
            <input
                style={{display: 'none'}} /* Make the file input element invisible */
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={(e) => updateTodo(e,todo)}
            />
            <img className={todo.status ? "Card--button__done" : `hide-button`} src={todo.url} alt={todo.name} height="80px" />
            <button
              onClick={() => deleteTodo(todo._id)}
              className="Card--button__delete"
            >
              Delete
            </button>
            <button
              onClick={() => setShowEdit(true)}
              className="Card--button__done"
            >
              Edit
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
                className="Card--button__done"
              >
                Cancel
              </button>
            </div>
          </div>
        )
  }
  
}

export default Todo