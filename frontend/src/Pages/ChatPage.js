import { useEffect, useState} from 'react'
import { ChatState } from '../Context/ChatProvider'
import {Box} from '@chakra-ui/react'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'


const ChatPage = () => {

  // need to rerender whenever user change? need a useEffect?
  const { user } = ChatState();
  // const {user, chats} = ChatState()
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{width: "100%"}}>
      {user && <SideDrawer />}
      <Box d='flex' justifyContent='center' w='100%' h='91.5vh' p='10px'>
        {user && <MyChats fetchAgain={fetchAgain} user={user}/>}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  )
}

export default ChatPage