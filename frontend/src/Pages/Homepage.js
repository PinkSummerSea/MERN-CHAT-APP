import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Box, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'

const Homepage = () => {

  const history = useHistory()

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"))
    if(user) history.push('/chats')
  }, [history])

  return (
    <Container maxW="xl" centerContent>
      <Box
        d='flex'
        justifyContent='center'
        p={3}
        bg='rgba(255,255,255,0.3)'
        w="100%"
        m="40px 0 15px 0"
        borderRadius='lg'
        borderWidth='1px'
      >
        <Text fontSize='4xl' fontFamily='Silkscreen' color='black'>TALKATIVE</Text>
      </Box>
      <Box
        bg='rgba(255,255,255,0.3)'
        w='100%'
        p={4}
        borderRadius='lg'
        borderWidth='1px'

      >
        <Tabs variant='soft-rounded' colorScheme='purple'>
          <TabList mb='1em'>
            <Tab width='50%'>Login</Tab>
            <Tab width='50%'>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login /> 
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
      </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage