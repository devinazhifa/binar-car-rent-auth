import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from "react-redux"
import axios from "axios"
import jwtDecode from "jwt-decode"
import Async from 'react-async'
import userSlice from "./store/user"

import Register from "./Page/Register"
import Login from "./Page/Login"
import Home from "./Page/Home"
import Logout from "./Page/Logout"
import Dashboard from "./Page/Dashboard"

const getUser = async () => {
  try {
    const token = localStorage.getItem('minishopAccessToken')
    const userData = jwtDecode(token)
    const res = await axios.get(`http://localhost:4000/users/${userData.sub}`)
    return {
      user: res.data
    } 
  } catch {
    return {
      user: null
    }
  }
}

function App() {

  const dispatch = useDispatch()
  const [setLogin] = useState([])

  return (
    <Async promiseFn={getUser}>
      {( {data, error, isPending} ) => {
        if(isPending) {
          return (
            <h2>Loading...</h2>
          )
        }
        if(error) {
          return (
            <h2>Error</h2>
          )
        }
        if(data){
          if ( data.user !== null ){
            dispatch(userSlice.actions.addUser( {userData: data.user} ))
          }
          return (
            <BrowserRouter>
              <div className="App">
                <Routes>
                  <Route path="/" element={<Login />}></Route>
                  <Route path="/register" element={<Register />}></Route>
                  <Route path="/home" element={<Home />}></Route>
                  <Route path="/dashboard" element={<Dashboard />}></Route>
                  <Route path="/logout" element={<Logout />}></Route>
                </Routes>

                <Login setLogin={setLogin} />                
              </div>
            </BrowserRouter>
          );
        }
      }}
    </Async>
  )

}

export default App;