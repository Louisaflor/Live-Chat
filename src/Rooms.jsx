import {useState, useEffect} from 'react'
import './App.css'
export default function Rooms() {


  return (
    <div className="Rooms">
      <div className="selectRooms" >
        <input placeholder="Username..." />
        <br/>
        <select>
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