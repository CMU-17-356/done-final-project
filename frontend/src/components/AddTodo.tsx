import { unwatchFile } from 'fs'
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = TodoProps & {
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void 
}

const AddTodo: React.FC<Props> = ({todo, saveTodo }) => {
  const [formData, setFormData] = useState<ITodo | {}>()
  const [name, setName] = useState(todo.name)
  const [description, setDescription] = useState(todo.description)
  const [label, setLabel] = useState(todo.label)
  const [priority, setPriority] = useState(todo.priority)
  const [dueDate, setDueDate] = useState(todo.dueDate)
  const [recurring, setRecurring] = useState(todo.recurring)
  const [day, setDay] = useState("Monday")
  const [show, setShow] = useState(false)

  let priorities = [
        { label: "Select a priority", value: "" },
        { label: "Low", value: "Low" },
        { label: "Medium", value: "Medium" },
        { label: "High", value: "High" }
    ]

  let recurrings = [
        { label: "Select a recurring schedule", value: "" },
        { label: "Daily", value: "Daily" },
        { label: "Weekly", value: "Weekly" }
    ]
  
  let days = [
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
        { label: "Sunday", value: "Sunday" },
    ]

//   const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
//     setFormData({
//       ...formData,
//       [e.currentTarget.id]: e.currentTarget.value,
//     })
//   }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {

    e.preventDefault();
    
    const todo: ITodo = {
        _id: "",
        name: name,
        description: description,
        label: label,
        priority: priority,
        dueDate: dueDate,
        recurring: recurring,
        day: day,
        status: false,
        createdAt: new Date(),
      }

    console.log("Added todo:", todo)

    saveTodo(e, todo); 
    setName("");
    setDescription("");
    setLabel("");
    setPriority("");
    setDueDate(null);
    setRecurring("");
  }

  return ( show && (
    <div> 
    <form className='Form' onSubmit={handleSubmit}>
        <div className="form-group mt-3">
            <input onChange={(e) => setName(e.currentTarget.value)} type='text' id='name' value={name} placeholder="Name"/>
        </div>
        <div className="form-group mt-3">
            <textarea onChange={(e) => setDescription(e.currentTarget.value)} id='description' value={description} placeholder="Description"/>
        </div>
        <div className="form-group mt-3">
            <input onChange={(e) => setLabel(e.currentTarget.value)} type='text' id='label' value={label} placeholder="Label"/>
        </div>

        <div className="form-group mt-3">
            {/* <input 
            onChange={(e) => setPriority(e.currentTarget.value)} 
            type='text' 
            id='priority' 
            value={priority} 
            placeholder="Priority"/> */}

            <select onChange={(e) => setPriority(e.currentTarget.value)} > 
                {/* <option value={priority}> -- Select a priority -- </option> */}
                {priorities.map((p) => (p.value == priority && (<option value={p.value} selected>{p.label}</option>)) || (p.value != priority && (<option value={p.value}>{p.label}</option>)))}
            </select>

        </div>
        <div className="form-group mt-3">
            <DatePicker 
                selected={dueDate} 
                onChange={date => setDueDate(date)} 
                showTimeSelect 
                dateFormat="MMMM d, yyyy h:mmaa" 
                placeholderText="Due Date"
                isClearable
                filterDate={d => {
                    return new Date() <= d;
                }}
             />
        </div>
        <div className="form-group mt-3">
            <select onChange={(e) => setRecurring(e.currentTarget.value)} > 
            {recurrings.map((x) => (x.value == recurring && (<option value={x.value} selected>{x.label}</option>)) || (x.value != recurring && (<option value={x.value}>{x.label}</option>)))}
            </select>
        </div>
        
        {recurring == "Weekly" &&
            <div className="form-group mt-3">
                <select onChange={(e) => setDay(e.currentTarget.value)}> 
                {days.map((x) => (x.value == day && (<option value={x.value} selected>{x.label}</option>)) || (x.value != day && (<option value={x.value}>{x.label}</option>)))}
                </select>
            </div>
        }

        <div className="form-group mt-3" >
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