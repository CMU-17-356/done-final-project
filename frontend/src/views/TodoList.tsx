import React, { useEffect, useState } from 'react'
import TodoItem from '../components/TodoItem'
import AddTodo from '../components/AddTodo'
// import { getTodos, addTodo, updateTodo, deleteTodo } from './API'
import { format } from "date-fns";
import Select from "react-select";
import Button from 'react-bootstrap/Button';



const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [completedTodos, setCompletedTodos] = useState<ITodo[]>([])
  const [currentImage, setCurrentImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("")
  const [filterOptions, setFilterOptions] = useState<{value:string, label:string}[]>([])
  const [searchInput, setSearchInput] = useState("");

  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  var sortPriority = (a, b) => {
    if(a.priority === b.priority){
      return 0
    } else if (a.priority === "High") {
      return -1
    } else if (b.priority === "High") {
      return 1
    } else if(a.priority === "Medium"){
      return -1
    } else if (b.priority === "Medium") {
      return 1
    } else if(a.priority === "Low"){
      return -1
    } else if (b.priority === "Low") {
      return 1
    } else {
      return 0
    }
  }

  var sortDate = (a, b) => {
    if(a.dueDate !== undefined && b.dueDate !== undefined && a.dueDate !== null && b.dueDate !== null){
      let larger = a.dueDate > b.dueDate;
      return larger ? 1 : -1;
    } else if (a.dueDate == undefined || a.dueDate == null) {
      return 1;
    } else if (b.dueDate == undefined || b.dueDate == null) {
      return -1;
    } else {
      return 0;
    }
  }

  var handleSortChange = (selected) => {
    setSort(selected.value);

    if(selected.value == "priority"){
      setTodos(oldTodos => oldTodos.sort((a, b) => sortPriority(a,b)));
    } else if (selected.value == "dueDate") {
      setTodos(oldTodos => oldTodos.sort((a, b) => sortDate(a,b)));
    }

  };
  var handleFilterChange = (selected) => {
    setFilter(selected.value);
  };

  const sortOptions = [
    { value: "", label: "No Sort" },
    { value: "dueDate", label: "Due Date" },
    { value: "priority", label: "Priority" },
  ];

  const emptyTodo: ITodo = {
    _id: "",
    name: "",
    description: "",
    label: "",
    priority: "",
    dueDate: null,
    status: false,
    createdAt: new Date(),
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
        description: "alsdfkjalsdkjflaksdjflaksjdlfkjasdlfkjasldkfjlaskdjflkasdjflkajsdflkjadslfkjasdlfkasldkfjalsdkjfladskjflkasdjflkasdjflkajsdfl",
        label: "label",
        priority: "High",
        dueDate: new Date(),
        status: false,
        createdAt: new Date(),
      }
    setTodos([todo])
    setFilterOptions(getFilterOptions([todo]))

  }

  const getFilterOptions = (arr: ITodo[]) => {
    return arr.filter((todo) => todo.label !== "").map((todo: ITodo) => ({"label": todo.label, "value": todo.label}))
  }

 const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault()
    formData._id = (Math.random() + 1).toString(36).substring(5);

    console.log("saved todo: ", formData)

    setTodos(oldTodos => [...oldTodos, formData])
    setFilterOptions(getFilterOptions([...todos, formData]))

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

    setCompletedTodos(oldTodos => [...oldTodos, todo])
    setTodos((oldTodos) => oldTodos.filter((oldTodo) => oldTodo._id !== todo._id));


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

    let found = todos.findIndex(el => el._id === todo._id)

    if(found != -1){
      let updatedArr = [...todos]; // copying the old datas array
      updatedArr[todos.findIndex(el => el._id === todo._id)] = todo; // replace e.target.value with whatever you want to change it to
      setTodos(updatedArr);
      setFilterOptions(getFilterOptions([...updatedArr, ...completedTodos]))
    }
    else {
      let updatedArr = [...completedTodos]; // copying the old datas array
      updatedArr[completedTodos.findIndex(el => el._id === todo._id)] = todo; // replace e.target.value with whatever you want to change it to
      setCompletedTodos(updatedArr);
      setFilterOptions(getFilterOptions([...updatedArr, ...todos]))
    }


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
    setFilterOptions(getFilterOptions(todos.filter((todo) => todo._id !== _id)))


    // deleteTodo(_id)
    // .then(({ status, data }) => {
    //     if (status !== 200) {
    //       throw new Error('Error! Todo not deleted')
    //     }
    //     setTodos(data.todos)
    //   })
    //   .catch((err) => console.log(err))
  }

  const movePrevious = (e): void => {
    e.preventDefault()
    setDate(date => {
      date.setDate(date.getDate() - 1);
      return new Date(date)
    });
  }
  const moveNext = (e): void => {
    e.preventDefault()
    setDate(date => {
      date.setDate(date.getDate() + 1);
      return new Date(date)
    });
  }

  return (
    <main className='TodoList'>
      <div className="Card">
        <Button onClick={movePrevious}>Previous</Button>
        <h1>TODO: { weekday[date.getDay()]}, {format(date, "MMMM do")}</h1>
        <Button onClick={moveNext}>Next</Button>
      </div>
      <AddTodo 
        todo={emptyTodo}
        saveTodo={handleSaveTodo} />
      <div className='mt-3'>Search by Task Name: </div>
      <input
        type="search"
        placeholder="Search here"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput} />
      <div>
        <div className='mt-3'>Sort by: </div>
        <Select 
          onChange={handleSortChange}
          options={sortOptions}
          className="selector"
          defaultValue={{label: "No Sort", value:""}}
        />
        <div className='mt-3'>Filter by Label: </div>
        <Select
          onChange={handleFilterChange}
          options={[{"value": "", "label": "No Filter"}, ...filterOptions]}
          className="selector"
          defaultValue={{label: "No Filter", value:""}}
        />
      </div>
      <div className='mt-3'>Todo List: </div>
      {todos.filter((todo) => {
            return todo.name.toLowerCase().includes(searchInput.toLowerCase());
        }).filter((todo) => {
          return todo.label.toLowerCase().includes(filter.toLowerCase());
        }).filter((todo) => {
          if(todo.dueDate !== undefined && todo.dueDate !== null){
            if (todo.recurring === "Weekly"){
              console.log("check filter", todo.dueDate, date, weekday[date.getDay()], todo.day)
              return todo.dueDate >= date && weekday[date.getDay()] === todo.day;
            }
            return todo.dueDate >= date;
          } else {
              if (todo.recurring === "Weekly"){
                console.log("check filter", todo.dueDate, date, weekday[date.getDay()], todo.day)
                return weekday[date.getDay()] === todo.day;
              } else if (todo.recurring === "Daily"){
                return true;
              }
              return todo.createdAt.getDate() === date.getDate();
          }
        }).map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          saveTodo={handleEditTodo}
          todo={todo}
        />
      ))}
      <div className='mt-3'>Completed: </div>
      {completedTodos.filter((todo) => {
            return todo.name.toLowerCase().includes(searchInput.toLowerCase());
        }).filter((todo) => {
          return todo.label.toLowerCase().includes(filter.toLowerCase());
        }).filter((todo) => {
          if(todo.dueDate !== undefined && todo.dueDate !== null){
            if (todo.recurring === "Weekly"){
              console.log("check filter", todo.dueDate, date, weekday[date.getDay()], todo.day)
              return todo.dueDate >= date && weekday[date.getDay()] === todo.day;
            }
            return todo.dueDate >= date;
          } else {
              if (todo.recurring === "Weekly"){
                console.log("check filter", todo.dueDate, date, weekday[date.getDay()], todo.day)
                return weekday[date.getDay()] === todo.day;
              } else if (todo.recurring === "Daily"){
                return true;
              }
              return todo.createdAt.getDate() === date.getDate();
          }
        }).map((todo: ITodo) => (
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