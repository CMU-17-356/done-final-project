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
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar";

function App() {
  return (
    <Container className="mb-4">
    <div>
      <Navbar />
    </div>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/todo" element={<TodoList />} />
      <Route path="/upload" element={<ImageUpload />} />
      <Route path="/history" element={<HistoryView />} />
      <Route path="/example" element={<Example />} />
    </Routes>
    </Container>
  );
}

export default App;