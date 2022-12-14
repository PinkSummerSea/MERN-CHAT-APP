import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  FormControl,
  Input,
  Box
} from '@chakra-ui/react'

import { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import UserListItem from '../UserAvatar/UserListItem'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'
import { useHistory } from 'react-router-dom'

const GroupChatModal = ({children}) => {

  const history = useHistory()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState([""]);
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)

  const toast = useToast()

  const {user, chats, setChats, groupModalClosed, setGroupModelClosed} = ChatState()
  console.log(groupModalClosed)

  const handleSearch = async (query) => {
    setSearch(query)
    if(!query){
        return;
    }

    try{
        setLoading(true)
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        }
        const {data} = await axios.get(`/api/user?search=${search}`, config)
        //console.log(data)
        setLoading(false)
        setSearchResult(data)

    }catch(err) {
        toast({
          title: 'Faild to fetch/create chat',
          description: err.message,
          status: 'warning',
          duration: '5000',
          isClosable: true,
          position: 'bottom-left'
        })
    }
  }

  const handleSubmit = async ()=> {
    if(!groupChatName || selectedUsers.length === 0) {
        toast({
          title: 'Please fill required fields',
          status: 'warning',
          duration: '5000',
          isClosable: true,
          position: 'top'
        })
        return;
    }

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        }
        const {data}= await axios.post('/api/chat/group', {
            name: groupChatName,
            users: JSON.stringify(selectedUsers.map(u => u._id))
        }, config)

        setChats([data, ...chats])
        
        console.log("chats", chats)
        onClose()
        setGroupModelClosed(!groupModalClosed)
        toast({
          title: 'New group chat created',
          status: 'success',
          duration: '5000',
          isClosable: true,
          position: 'bottom'
        })
        
    } catch(err) {
        toast({
          title: 'Failed to create chat',
          description: err.response.data,
          status: 'error',
          duration: '5000',
          isClosable: true,
          position: 'bottom'
        })
    }
  }

  const handleGroup =(userToAdd)=>{
    if(selectedUsers.includes(userToAdd)){
        toast({
          title: 'User already added',
          status: 'warning',
          duration: '5000',
          isClosable: true,
          position: 'top'
        })
        return;
    }

    setSelectedUsers([...selectedUsers, userToAdd])
  }

  const handleDelete =(userToDelete)=> {
    setSelectedUsers(selectedUsers.filter(u => u._id !== userToDelete._id))
  }


  return (
    <>
      {/* <Button
        d='flex'
        fontSize={{base: '17px', md: '10px', lg: '17px'}}
        rightIcon={<AddIcon />}
        onClick={onOpen}
      >
        New Group Chat
     </Button>  */}
     <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize='35px'
            fontFamily='Silkscreen'
            d='flex'
            justifyContent='center'
          >Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d='flex'
            flexDir='column'
            alignItems='center'
          >
            <FormControl>
                <Input placeholder='Chat Name' mb={3} onChange={e => setGroupChatName(e.target.value)}/>
            </FormControl>
            <FormControl>
                <Input placeholder='Add Users eg: Summer, Cody, Zhuzhu' mb={1} onChange={e => handleSearch(e.target.value)}/>
            </FormControl>
            <Box d='flex' w='100%' flexWrap='wrap'>
            {selectedUsers.map(u => (
                <UserBadgeItem key={user._id} user={u} handleFunction={()=>handleDelete(u)} />
            ))}
            </Box>
            {loading?(<div></div>):(
                searchResult?.slice(0,4).map(user =>(
                    <UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)}/>
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='pink' onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal