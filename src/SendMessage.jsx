import {React, useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Rooms from './Rooms'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function SendMessage({socket, setMessage, }) {

  const sendMesage = (e) => {
    console.log('sending the message here: ', message)
    socket.emit('send_message' , {message})
    setMessage("")
  }

  return (
    <div className="App">


    <Messages socket={socket} />
    <div className="submit">
    <input className="input" type="text" placeholder="Message..." value={message} onChange={(e) => setMessage(e.target.value)} />
    <button onClick={sendMesage}>Submit</button>
    </div>

  </div>
  )
}