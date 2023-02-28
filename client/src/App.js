import './App.css';
import io from "socket.io-client"
import Chat from './components/Chat';
import {useState} from "react"
// here front end is connecting to the backend
const socket = io.connect("http://localhost:3001");

function App() {
  const [username,setUsername]=useState("")
  const [room,setRoom]=useState("")
  const [showChat,setShowChat]=useState(false)
  const joinRoom=()=>{
      if(username !== "" && room !== "" ){
        // we are emmiting an event and passing the room to backend
        socket.emit("Join_room", room)
        setShowChat(true)
      }
  }
  return (<div className="App">
    {!showChat ? (
    <div className='joinChatContainer'>
         <h3>Join a Chat</h3>
         <input type="text" placeholder='john' onChange={(e)=>{setUsername(e.target.value)}}/>
         <input type="text" placeholder='Room ID' onChange={(e)=>{setRoom(e.target.value)}} />
         <button onClick={joinRoom}>Join a Room</button>
  </div>
    )
  :(
  <Chat  socket={socket} username={username} room={room} />
  )}
  </div>
  );

}

export default App;
