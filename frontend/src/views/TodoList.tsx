import React, { useEffect, useState } from 'react'
import TodoItem from '../components/TodoItem'
import AddTodo from '../components/AddTodo'
// import { getTodos, addTodo, updateTodo, deleteTodo } from './API'
import { format } from "date-fns";
import Select from "react-select";
import Button from 'react-bootstrap/Button';
import {getAllTasks, getTask, updateTask2, deleteTask, addTask, ITask} from '../backend-adapter'

const sameDay = (first:Date, second:Date) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

const beforeDay = (first:Date, second:Date) =>
    first.getFullYear() <= second.getFullYear() &&
    first.getMonth() <= second.getMonth() &&
    first.getDate() <= second.getDate();

const TodoList = (username) => {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [completedTodos, setCompletedTodos] = useState<ITodo[]>([])
  const [date, setDate] = useState<Date>(new Date());
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("")
  const [filterOptions, setFilterOptions] = useState<{value:string, label:string}[]>([])
  const [searchInput, setSearchInput] = useState("");

  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  var checkSort = (a, b) => {
    if(sort == "priority"){
      return sortPriority(a,b);
    } else if (sort == "dueDate") {
      return sortDate(a,b);
    }
    return 0;
  }

  var sortPriority = (a, b) => {
    if(a.priority === b.priority){
      return sortDate(a,b)
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
      return sortDate(a,b)
    }
  }

  var sortDate = (a, b) => {
    if(a.dueDate !== undefined && b.dueDate !== undefined && a.dueDate !== null && b.dueDate !== null){
      let larger = a.dueDate > b.dueDate;
      return larger ? 1 : -1;
    } else if ((a.dueDate == undefined || a.dueDate == null) && (b.dueDate !== undefined && b.dueDate !== null)) {
      return 1;
    } else if ((b.dueDate == undefined || b.dueDate == null) && (a.dueDate !== undefined && a.dueDate !== null)) {
      return -1;
    } else {
      return sortPriority(a,b);
    }
  }

  var handleSortChange = (selected) => {
    setSort(selected.value);
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
    createdAt: new Date(),
    user: username.username,
    completed: [],
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = () => {
    getAllTasks(username.username)
    .then((curr) => {
      setCompletedTodos(curr.filter((task) => task.completed.filter((x) => sameDay(x.date,date)).length > 0))
      setTodos(curr.filter((task) => task.completed.filter((x) => sameDay(x.date,date)).length == 0))
      setFilterOptions(getFilterOptions(curr));
    })
  }

  const getFilterOptions = (arr: ITodo[]) => {
    return arr.filter((todo) => todo.label !== "").map((todo: ITodo) => ({"label": todo.label, "value": todo.label}))
  }

 const handleSaveTodo = (e: React.FormEvent, formData: ITodo) => {
    e.preventDefault()

    addTask(formData)
      .then(()=> {
        getAllTasks(username.username)
        .then((curr) => {
          setCompletedTodos(curr.filter((task) => task.completed.filter((x) => sameDay(x.date,date)).length > 0))
          setTodos(curr.filter((task) => task.completed.filter((x) => sameDay(x.date,date)).length == 0))
          setFilterOptions(getFilterOptions(curr));
        })
      })
}

  const handleCompleteTodo = (event: React.ChangeEvent<HTMLInputElement>, todo: ITodo): void => {

    const selectedFiles = event.target.files as FileList;
    let url = URL.createObjectURL(selectedFiles?.[0]);
    todo.completed.push({date: date, photo: url});

    updateTask2(todo)
      .then(()=> {
        getAllTasks(username.username)
        .then((curr) => {
          setCompletedTodos(curr.filter((task) => task.completed.filter((x) => sameDay(x.date,date)).length > 0))
          setTodos(curr.filter((task) => task.completed.filter((x) => sameDay(x.date,date)).length == 0))
          setFilterOptions(getFilterOptions(curr));
        })
      })
  }

  const handleEditTodo = (e: React.FormEvent, todo: ITodo): void => {
    e.preventDefault()

    updateTask2(todo)
      .then(()=> {
        getAllTasks(username.username)
        .then((curr) => {
          setCompletedTodos(curr.filter((task) => task.completed.filter((x) => sameDay(x.date,date)).length > 0))
          setTodos(curr.filter((task) => task.completed.filter((x) => sameDay(x.date,date)).length == 0))
          setFilterOptions(getFilterOptions(curr));
        })
      })
  }

  const handleDeleteTodo = (_id: string): void => {
    deleteTask(_id)
      .then(()=> {
        getAllTasks(username.username)
        .then((curr) => {
          setCompletedTodos(curr.filter((task) => task.completed.filter((x) => sameDay(x.date,date)).length > 0))
          setTodos(curr.filter((task) => task.completed.filter((x) => sameDay(x.date,date)).length == 0))
          setFilterOptions(getFilterOptions(curr));
        })
      })
  }

  const movePrevious = (e): void => {
    e.preventDefault()
    setDate(date => {
      date.setDate(date.getDate() - 1);
      return new Date(date)
    });
    getAllTasks(username.username)
      .then((curr) => {
        setCompletedTodos(curr.filter((task) => task.completed.filter((x) => sameDay(x.date,date)).length > 0))
        setTodos(curr.filter((task) => task.completed.filter((x) => sameDay(x.date,date)).length == 0))
        setFilterOptions(getFilterOptions(curr));
      })
  }
  const moveNext = (e): void => {
    e.preventDefault()
    setDate(date => {
      date.setDate(date.getDate() + 1);
      return new Date(date)
    });
    getAllTasks(username.username)
      .then((curr) => {
        setCompletedTodos(curr.filter((task) => task.completed.filter((x) => sameDay(x.date,date)).length > 0))
        setTodos(curr.filter((task) => task.completed.filter((x) => sameDay(x.date,date)).length == 0))
        setFilterOptions(getFilterOptions(curr));
      })
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
        <TodoItem
          key={todo._id}
          updateTodo={handleCompleteTodo}
          deleteTodo={handleDeleteTodo}
          saveTodo={handleEditTodo}
          todo={todo}
          date={date}
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
        <TodoItem
          key={todo._id}
          updateTodo={handleCompleteTodo}
          deleteTodo={handleDeleteTodo}
          saveTodo={handleEditTodo}
          todo={todo}
          date={date}
        />
      ))}
    </main>
  )
}

export default TodoList