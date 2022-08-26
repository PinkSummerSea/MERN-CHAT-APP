import { Box } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import SingleChat from './SingleChat'

const ChatBox = ({fetchAgain, setFetchAgain}) => {

  const {selectedChat, setSelectedChat} = ChatState()
  return (
    <Box
      d={{base: selectedChat?'flex':'none', md: 'flex'}}
      alignItems='center'
      flexDir='column'
      p={5}
      bg='rgba(255,0,0,0.1)'
      w={{base:'100%', md:'50%'}}
      borderRadius='lg'
      borderWidth='1px'
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </Box>
  )
}

export default ChatBox