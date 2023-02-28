import React, { useEffect, useState } from 'react'

function Chat({socket,username,room}) {
  const [curentMessage,setcurentMessage]=useState("")
  const [messageList,setmessageList]=useState([])
  const sendMessage=async()=>{
      if(curentMessage !== ""){
         const messageData={
             room:room,
             author:username,
             message:curentMessage,
             time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
         }
         await socket.emit("send_message",messageData)
         setmessageList((list)=>[...list,messageData])
      }
  };

  useEffect(()=>{
      socket.on("receive_message",(data)=>{
        setmessageList((list)=>[...list,data])
      })
  },[socket]);
  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>
        {messageList.map((messageContent)=>{
          // console.log(messageContent);
          return <div className='message'>
            <div>
              <div className='message-content'>
                <p>{messageContent.message}</p>
              </div>
              <div className='message-meta'>
                <p>{messageContent.author}</p>
                <p>{messageContent.time}</p>
              </div>
            </div>
          </div>
        })}
      </div>
      <div className='chat-footer'>
        <input type="text" placeholder='Hey...' onChange={(e)=>{setcurentMessage(e.target.value)}}/>
        <button onClick={sendMessage} >&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
