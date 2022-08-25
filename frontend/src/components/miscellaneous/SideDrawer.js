import { Box, Button, Tooltip, Text, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, Drawer, DrawerBody,
  DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Input, useToast, Spinner, effect, } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import {useState} from 'react'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { getSender } from '../../config/ChatLogics';
import NotificationBadge, {Effect} from 'react-notification-badge'

const SideDrawer = () => {
  const {user, setSelectedChat, chats, setChats, notification, setNotification} = ChatState()
  const history = useHistory()
  const toast = useToast()
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false)

  const logoutHandler =  () => {
    localStorage.removeItem('userInfo')
    history.push('/')
  }

  const { isOpen, onClose, onOpen, onDisclosure } = useDisclosure()

  const handleSearch = async () => {
    if(!search){
      toast({
        title: 'Please enter keyword to search',
        status: 'warning',
        duration: '5000',
        isClosable: true,
        position: 'top-left'
      })
      return;
    }

    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const {data} = await axios.get(`/api/user?search=${search}`, config)
      setLoading(false)
      setSearchResult(data)
    } catch(err){
      toast({
        title: 'Error occured',
        description: 'Failed to load the search result',
        status: 'warning',
        duration: '5000',
        isClosable: true,
        position: 'bottom-left'
      })
    }
  }

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true)
      const config = {
        headers: {
          //"Content-type": "applicaton/json",
          Authorization: `Bearer ${user.token}`
        }
      }

      const {data} = await axios.post('/api/chat', {userId}, config)
      console.log(data)
      if (!chats.find(c => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data)
      setLoadingChat(false)
      onClose()
      } catch (err) {
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

  return (
    <>
      <Box
        d='flex'
        justifyContent='space-between'
        alignItems='center'
        bg='white'
        w='100%'
        p='5px 10px 5px 10px'
        borderWidth='5px'
      >
        <Tooltip label='Search Users to Chat' hasArrow placement='bottom-end'>
          <Button variant='ghost' onClick={onOpen}>
            <i class="fa-solid fa-magnifying-glass"></i>
            <Text d={{base: 'none', md: 'flex'}} px='4'>Search User</Text>
          </Button>
        </Tooltip>

        <Text fontSize='2xl' fontFamily='Work sans'>TALKATIVE</Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge count={notification.length} effect={Effect.SCALE}/>
              <BellIcon fontSize='2xl' m={1}/>
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map(n => (
                <MenuItem key={n._id} onClick={()=>{
                  setSelectedChat(n.chat)
                  setNotification(notification.filter(noti => noti !== n))
                }}>
                  {n.chat.isGroupChat? `New Message in ${n.chat.chatName}`:`New Message from ${getSender(user, n.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton 
            
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar size='sm' name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer
        placement='left'
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Search Users</DrawerHeader>
          <DrawerBody>
            <Box d='flex' pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Button 
                onClick={handleSearch}
              >Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult.map(user=>(
                <UserListItem 
                  key={user._id}
                  user={user}
                  handleFunction={()=>accessChat(user._id)}
                />
              ))
            )}
            { loadingChat && <Spinner ml='auto' d='flex' />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer