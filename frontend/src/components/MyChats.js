import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Stack, useToast, Text, background } from '@chakra-ui/react'
import axios from 'axios'
import {useState,useEffect} from 'react'
import {ChatState} from '../Context/ChatProvider'
import ChatLoading from './ChatLoading'
import { getSender } from '../config/ChatLogics'
import GroupChatModal from './miscellaneous/GroupChatModal'


const MyChats = ({fetchAgain, user}) => {
  
  const { selectedChat, setSelectedChat, setChats, chats, setUser, groupModalClosed } = ChatState()
  const [loggedUser, setLoggedUser] = useState(user)
  const toast = useToast()

  

  useEffect(()=>{
    // setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
    // console.log(loggedUser)
    //setUser(JSON.parse(localStorage.getItem("userInfo")))
    const fetchChats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }

        const {data} = await axios.get('/api/chat', config)
        await setChats(data)
        console.log(data)
        console.log(chats)
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
    fetchChats()
    
  },[fetchAgain, user])

  return (
    <Box
      d={{base: selectedChat? 'none' : 'flex', md: 'flex'}}
      flexDir='column'
      alignItems='center'
      p={3}
      mr={5}
      bg='rgba(255, 0, 0, 0.1)'
      w={{base: '100%', md:'20%'}}
      borderRadius='lg'
      borderWidth='1px'
    >
      <Box
        pb={5}
        px={5}
        fontSize={{base: '28px', md: '30px'}}
        fontFamily='Silkscreen'
        d='flex'
        flexDir='column'
        w='100%'
        //justifyContent='space-between'
        alignItems='center'
      >
        <Text>
           My Chats
        </Text>
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            bg="rgb(246, 244, 182)"
            _hover={
              {
                bg:"rgb(246, 244, 182)"
              }
            }
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d='flex'
        flexDir='column'
        p={3}
        bg='rgba(255, 255, 242, 0.25)'
        w='100%'
        h='100%'
        borderRadius='lg'
        overflowY='HIDDEN'
      >
        {chats.length > 0 ? (
          <Stack overflowY="scroll">
            {chats.map((chat) =>  (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "rgb(188, 173, 250)" : "rgb(223, 250, 251)"}
                color='black'
                //{selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                fontFamily='Silkscreen'
              >
                <Text>
                  {/* {console.log(chat)} */}
                  {chat.isGroupChat ? chat.chatName : getSender(/* loggedUser*/user, chat.users)}
                </Text>
              </Box>)
            )}
          </Stack>
        ) : (
          // <ChatLoading />
          <Text>
            Uh oh. You have no chats to display yet.
            Search a user to start one-on-one chat. 
            Or Start a group chat by clicking New Group Chat button.
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default MyChats