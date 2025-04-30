import database from "../database/firebase.config"
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from "./pages/Signup"
import Login from "./pages/Login/Login"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
