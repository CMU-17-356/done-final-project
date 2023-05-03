import React from 'react';
// import LoginLayout from './components/layout/LoginLayout';
import Login from './views/Login'
import SignUp from './views/SignUp'
import TodoList from './views/TodoList'
import ImageUpload from './components/ImageUpload'
import HistoryView from './views/HistoryView'
import Example from './views/Backend_Example';
import { Route, Routes } from "react-router-dom"
import { Container } from "react-bootstrap"
import Navbar from "./components/Navbar";
import { useLocalStorage } from "./hooks/UseLocalStorage"
import 'react-calendar/dist/Calendar.css';
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"

function App() {

  const [navState, setNavState] = useLocalStorage<Boolean>("navState", false)
  const [username, setUsername] = useLocalStorage<String>("username", "")

  return (
    <Container className="mb-4">
    <div>
      <Navbar navState={navState} setNavState={setNavState}/>
    </div>
    <Routes>
      <Route path="/" element={<Login setNavState={setNavState} setUsername={setUsername}/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/todo" element={<TodoList username={username}/>} />
      <Route path="/upload" element={<ImageUpload />} />
      <Route path="/history" element={<HistoryView username={username}/>} />
      <Route path="/example" element={<Example />} />
    </Routes>
    </Container>
  );
}

export default App;