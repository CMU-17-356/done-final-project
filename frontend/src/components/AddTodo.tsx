import { unwatchFile } from 'fs'
import React, { useState } from 'react'

type Props = { 
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void 
}

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo | {}>()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [show, setShow] = useState(false)

//   const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
//     setFormData({
//       ...formData,
//       [e.currentTarget.id]: e.currentTarget.value,
//     })
//   }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {

    const todo: ITodo = {
        _id: "",
        name: name,
        description: description,
        status: false,
      }

    console.log("SLDFKJLSDKFJLDSKFJ")

    saveTodo(e, todo); 
    setName("");
    setDescription("");
  }

  return ( show && (
    <div> 
    <form className='Form' onSubmit={handleSubmit}>
    
        <div className="form-group mt-3">
            <input onChange={(e) => setName(e.currentTarget.value)} type='text' id='name' value={name} placeholder="Name"/>
        </div>
        <div className="form-group mt-3">
            <input onChange={(e) => setDescription(e.currentTarget.value)} type='text' id='description' value={description} placeholder="Description"/>
        </div>
        <div className="form-group mt-3">
            <button disabled={name == "" || description == "" ? true: false} >Add Todo</button>
        </div>
        <div className="form-group mt-3">
            <button onClick={() => setShow(false)} >Close</button>
        </div>
    </form>
    </div>) || 
    <form className='Form'>
        <div>
            <button onClick={() => setShow(true)} >Create Todo</button>
        </div>
    </form>
  )
}

export default AddTodo