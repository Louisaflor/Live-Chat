import { useState, useEffect } from 'react'

export default function Messages({socket}) {

  const [displayMessage, setDisplayMessage] = useState([])

  useEffect(() => {
    socket.on('recieve_message', (data) => {
      console.log('im i getting my data back to the front?: ', data.message)

      setDisplayMessage(oldState => [...oldState, {message: data.message}])
    })

    //data clean up
    return () => socket.off('receive_message');
  }, [socket])

   return (
    <div>
      {displayMessage && displayMessage.map((msg, index) => (
        <div key={index}>{msg.message}</div>
      )) }
    </div>
  )
}