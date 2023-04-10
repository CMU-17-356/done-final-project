import React from 'react';
// import LoginLayout from './components/layout/LoginLayout';
import Login from './views/Login'
import SignUp from './views/SignUp'
import TodoList from './views/TodoList'
import ImageUpload from './components/ImageUpload'
import { Route, Routes } from "react-router-dom"
import { Container } from "react-bootstrap"
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <Container className="mb-4">
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/todo" element={<TodoList />} />
      <Route path="/upload" element={<ImageUpload />} />
    </Routes>
    </Container>
  );
}

export default App;