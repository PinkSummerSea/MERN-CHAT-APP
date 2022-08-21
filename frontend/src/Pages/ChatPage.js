import {useEffect, useState} from 'react'
import axios from 'axios'


const ChatPage = () => {
  const [chats, setChats] = useState([])
  const fetchChats = async () => {
    const res = await axios.get('/api/chat')
    setChats(res.data)
  }

  useEffect(()=>{
    fetchChats()
  }, [])

  return (
    <div>
        {chats.map((c) => (
            <p key={c._id}>{c.chatName}</p>
        ))}
    </div>
  )
}

export default ChatPage