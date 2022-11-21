import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client'

//////////
//import vitePluginSocketIO from "vite-plugin-socket-io";

const socket = io.connect('http://127.0.0.1:4000') //Adding this, out server for the socket will run on port 4000

function App() {
  const [message, setMessage] = useState()

  const sendMesage = (e) => {
    console.log('sending the message here: ', message)
    socket.emit('send_message' , {message})
    setMessage("")
  }

  return (
    <div className="App">
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <input type="text" placeholder="Message..." value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMesage}>Submit</button>
    </div>
  )
}

export default App
