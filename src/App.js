import React, { useEffect } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from "react-redux"
import axios from "axios"
import jwtDecode from "jwt-decode"
import userSlice from "./store/user"

import Register from "./Page/Register"
import Login from "./Page/Login"
import Home from "./Page/Home"
import Logout from "./Page/Logout"

function App() {

  const dispatch = useDispatch()

  useEffect( () => {
    try {
      const token = localStorage.getItem('binarAccessToken')
      const userData = jwtDecode(token)
      axios.get(`http://localhost:4000/users/${userData.sub}`)
      .then( res => {
        dispatch( userSlice.actions.addUser({ userData: res.data }))
      })
    } catch {}
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;