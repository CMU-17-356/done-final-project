import React, { useEffect, useState } from 'react'
import TodoItem from '../components/TodoItem'
import AddTodo from '../components/AddTodo'
// import { getTodos, addTodo, updateTodo, deleteTodo } from './API'



const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [currentImage, setCurrentImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>("");

  const emptyTodo: ITodo = {
    _id: "",
    name: "",
    description: "",
    label: "",
    priority: "",
    dueDate: null,
    status: false,
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = (): void => {
    // getTodos()
    // .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
    // .catch((err: Error) => console.log(err))
    console.log("fetch todo")

    let r = (Math.random() + 1).toString(36).substring(5);

    const todo: ITodo = {
        _id: r,
        name: "task 1",
        description: "nice",
        label: "label",
        priority: "high",
        dueDate: new Date(),
        status: false,
      }
    setTodos([todo])

  }

 const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault()
    formData._id = (Math.random() + 1).toString(36).substring(5);

    console.log("saved todo: ", formData)

    setTodos(oldTodos => [...oldTodos, formData])
    
    console.log(todos)

//    addTodo(formData)
//    .then(({ status, data }) => {
//     if (status !== 201) {
//       throw new Error('Error! Todo not saved')
//     }
//     setTodos(data.todos)
//   })
//   .catch((err) => console.log(err))
}

  const handleUpdateTodo = (event: React.ChangeEvent<HTMLInputElement>, todo: ITodo): void => {
    console.log("updated todo")

    const selectedFiles = event.target.files as FileList;
    setCurrentImage(selectedFiles?.[0]);
    setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
    todo.status = true;
    todo.url = URL.createObjectURL(selectedFiles?.[0]);

    console.log(todo.url);

    // updateTodo(todo)
    // .then(({ status, data }) => {
    //     if (status !== 200) {
    //       throw new Error('Error! Todo not updated')
    //     }
    //     setTodos(data.todos)
    //   })
    //   .catch((err) => console.log(err))
  }

  const handleEditTodo = (e: React.FormEvent, todo: ITodo): void => {
    console.log("edited todo")

    let updatedArr = [...todos]; // copying the old datas array
    updatedArr[todos.findIndex(el => el._id === todo._id)] = todo; // replace e.target.value with whatever you want to change it to

    setTodos(updatedArr);

    // updateTodo(todo)
    // .then(({ status, data }) => {
    //     if (status !== 200) {
    //       throw new Error('Error! Todo not updated')
    //     }
    //     setTodos(data.todos)
    //   })
    //   .catch((err) => console.log(err))
  }


  const handleDeleteTodo = (_id: string): void => {
    console.log("deleteed todo")

    setTodos((oldTodos) => oldTodos.filter((todo) => todo._id !== _id));

    // deleteTodo(_id)
    // .then(({ status, data }) => {
    //     if (status !== 200) {
    //       throw new Error('Error! Todo not deleted')
    //     }
    //     setTodos(data.todos)
    //   })
    //   .catch((err) => console.log(err))
  }

  return (
    <main className='TodoList'>
      <h1>My Todos</h1>
      <AddTodo 
        todo={emptyTodo}
        saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          saveTodo={handleEditTodo}
          todo={todo}
        />
      ))}
    </main>
  )
}

export default TodoList