import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Stack, useToast, Text } from '@chakra-ui/react'
import axios from 'axios'
import {useState,useEffect} from 'react'
import {ChatState} from '../Context/ChatProvider'
import ChatLoading from './ChatLoading'
import { getSender
 } from '../config/ChatLogics'
const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState()
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState()
  const toast = useToast()

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const {data} = await axios.get('/api/chat', config)
      setChats(data)
    } catch(err) {
      toast({
          title: 'Faild to fetch chats',
          description: err.message,
          status: 'warning',
          duration: '5000',
          isClosable: true,
          position: 'bottom-left'
        })
    }
  }

  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
    fetchChats()
  },[])

  return (
    <Box
      d={{base: selectedChat? 'none' : 'flex', md: 'flex'}}
      flexDir='column'
      alignItems='center'
      p={3}
      bg='white'
      w={{base: '100%', md:'31%'}}
      borderRadius='lg'
      borderWidth='1px'
    >
      <Box
        pb={3}
        px={3}
        fontSize={{base: '28px', md: '30px'}}
        fontFamily='Work sand'
        d='flex'
        w='100%'
        justifyContent='space-between'
        alignItems='center'
      >
        My Chats
        <Button
          d='flex'
          fontSize={{base: '17px', md: '10px', lg: '17px'}}
          rightIcon={<AddIcon />}
        ></Button>
      </Box>
      <Box
        d='flex'
        flexDir='column'
        p={3}
        bg='#F8F8F8'
        w='100%'
        h='100%'
        borderRadius='lg'
        overflowY='HIDDEN'
      >
        { chats? (
          <Stack overflowY='scroll'>
            {
              chats.map(c => (
                <Box
                  onClick={()=> setSelectedChat(c)}
                  cursor='pointer'
                  bg={selectedChat === c? '#38B2AC' : '#E8E8E8'}
                  color={selectedChat===c? 'white':'black'}
                  px={3}
                  py={2}
                  borderRadius='lg'
                  key={c._id}

                >
                  <Text>
                    {!chats.isGroupChat?(getSender(loggedUser, c.users)):(c.chatName)}
                  </Text>
                </Box>
              ))
            }
          </Stack>
        ):(
          <ChatLoading />
        )}
      </Box>
    </Box>
  )
}

export default MyChats