import {useState} from 'react'
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { ChatState } from '../../Context/ChatProvider';

const Signup = () => {
  const {setUser, setSelectedChat} = ChatState()
  const [show, setShow] = useState(false)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [pic, setPic] = useState()
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const history = useHistory()

  const handleClick = () => {
    setShow(!show)
  }
//https://res.cloudinary.com/danvmjkut/image/upload/
  const postDetails = (uploadedPic) => {
    setLoading(true)
    if(uploadedPic === undefined) {
        toast({
            title:'Please select an image',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'bottom'
        })
        return;
    }
    
    console.log(uploadedPic)

    if(uploadedPic.type === 'image/jpeg' || uploadedPic.type === 'image/png') {
        const formData = new FormData();
        formData.append('file', uploadedPic);
        formData.append('upload_preset', 'chat-app');
        formData.append('cloud_name', 'danvmjkut');
        
        fetch('https://api.cloudinary.com/v1_1/danvmjkut/image/upload', {
            method: 'post',
            body: formData
        })
            .then((res) => res.json())
            .then(data=>{
                setPic(data.url.toString());    
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    } else {
        toast({
            title:'Please select an image',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'bottom'
        })
        setLoading(false)
        return;
    }
  }

  const submitHandler = async () => {
    setLoading(true)

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
        // const config = {
        //     headers: {
        //         "Content-type": 'application/json'
        //     }
        // }
        const {data} = await axios.post('/api/user', {name, email, password, pic})
        console.log(data)
        setUser(data)
        setSelectedChat(null)
        toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
        setLoading(false)
        history.push('/chats')

    } catch (err) {
        toast({
            title: "Error Occured!",
            description: err.response.data.message,
            status: "err",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setLoading(false);
        }
  }

  return (
    <VStack spacing={4}>
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
                placeholder='Enter your name'
                onChange={(e)=>{setName(e.target.value)}}
                bg="white"
            />
        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
                placeholder='Enter your email'
                onChange={(e)=>{setEmail(e.target.value)}}
                bg="white"
            />
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input 
                    type={show?"text":"password"}
                    placeholder='Enter your password'
                    onChange={(e)=>{setPassword(e.target.value)}}
                    bg="white"
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id='confirm-password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
                <Input 
                    type={show?"text":"password"}
                    placeholder='Confirm password'
                    onChange={(e)=>{setConfirmPassword(e.target.value)}}
                    bg="white"
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id='pic'>
            <FormLabel>Upload Profile Picture</FormLabel>
            <Input 
                type="file"
                p='1.5'
                accept='image/*'
                onChange={(e)=>{postDetails(e.target.files[0])}}
                bg="white"
            />
        </FormControl>
        <Button
            colorScheme='pink'
            width='100%'
            style={{marginTop: 15}}
            onClick={submitHandler}
            isLoading={loading}
        >
            Sign Up
        </Button>
    </VStack>
  )
}

export default Signup