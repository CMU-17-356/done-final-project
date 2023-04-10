import React from "react"
import { useState, useEffect } from "react";

type Props = TodoProps & {
  updateTodo: (event: React.ChangeEvent<HTMLInputElement>, todo: ITodo) => void
  deleteTodo: (_id: string) => void
}


const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : ""
  const checkDone: string = todo.status ? `Card-done` : 'Card'

  // Create a reference to the hidden file input element
  const inputRef = React.useRef<HTMLInputElement>(document.createElement("input"));

  const fileUpload = () => {
    console.log(inputRef.current);
    inputRef.current.click();
  };


  return (
    <div className={checkDone}>
      <div className="Card--text">
        <h1 className={checkTodo}>{todo.name}</h1>
        <span className={checkTodo}>{todo.description}</span>
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
      </div>
    </div>
  )
}

export default Todo