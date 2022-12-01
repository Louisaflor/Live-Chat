import {useState, useEffect} from 'react'
import './App.css'
export default function Rooms({setRoom, setUserName}) {


  return (
    <div className="Rooms">
      <div className="selectRooms" >
        <input
        placeholder="Username..."
        onChange={(e) => setUserName(e.target.value)}
        />
        <br/>
        <select
        onChange={(e) => setRoom(e.target.value)}>
          <option value="Room1">Room 1</option>
          <option value="Room2">Room 2</option>
          <option value="Room3">Room 3</option>
          <option value="Room4">Room 4</option>
        </select>
        <button>Start Chat</button>
      </div>

    </div>
  )
}