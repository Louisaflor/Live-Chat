import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'



export default function Rooms({room, setRoom, setUserName, username, socket}) {

  const navigate = useNavigate();


  //this function will take the user to the room they requested
  const changeRoom = () => {
    console.log('what is room number', room)
    if (room !== " " && username !== " ") {
      socket.emit('join room', {username, room})
    }

    //then we want to navigatie to the chat room
    navigate('/chat', {replace: true})
  }


  return (
    <div className="Rooms">
      <div className="selectRooms" >
        <input
        placeholder="Username..."
        onChange={(e) => setUserName(e.target.value)}
        />
        <br/>
        <select
        onChange={(e) => setRoom('hello')}>
          <option value="Room1">Room 1</option>
          <option value="Room2">Room 2</option>
          <option value="Room3">Room 3</option>
          <option value="Room4">Room 4</option>
        </select>
        <button onClick={changeRoom}>Start Chat</button>
      </div>

    </div>
  )
}