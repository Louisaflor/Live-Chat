import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Messages from './Messages.jsx'
import SendMessage from './SendMessage.jsx'
import Rooms from './Rooms'
import io from 'socket.io-client'



const socket = io.connect('http://127.0.0.1:4000') //Adding this, out server for the socket will run on port 4000


function App() {

  const [username, setUserName] = useState("")
  const [room, setRoom] = useState("Room1")

  const [message, setMessage] = useState("")
  //const [displayMessage, setDisplayMessage] = useState([])

  //console.log('what is the displayMessage OUTSIDE: ', displayMessage)


  return (
      <Router>
      <div>
        <Routes>
          <Route
          path='/'
          element={
            <Rooms room={room} username={username} setUserName={setUserName}  setRoom={setRoom} socket={socket}/>
          }
          />

          <Route
          path='/chat'
          element={
            <SendMessage socket={socket} setMessage={setMessage} message={message} />
          }
          />
        </Routes>
      </div>
      </Router>
  )
}

export default App
