import database from "../database/firebase.config"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from "./pages/Signup"
import Login from "./pages/Login/Login"
import Navbar from "./components/Navbar"
import Message from "./components/Message"
import Profile from "./components/Profile"
import UserList from "./components/UserList"

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Navbar />} >
          <Route index path="/message" element={<Message />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/allusers" element={<UserList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
