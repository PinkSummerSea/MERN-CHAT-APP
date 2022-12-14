import { ViewIcon } from '@chakra-ui/icons'
import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Image,
  Text
} from '@chakra-ui/react'



function ProfileModal({user, children}) {



  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      {
        children? (<span onClick={onOpen}>{children}</span>) :
        (<IconButton 
            d={{base: 'flex'}}
            icon={<ViewIcon />}
            onClick={onOpen}
        />)
      }

      <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
        <ModalOverlay />
        <ModalContent h='410px'>
          <ModalHeader
            fontSize='40px'
            fontFamily='Silkscreen'
            d='flex'
            justifyContent='center'
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d='flex'
            flexDir='column'
            alignItems='center'
            justifyContent='space-between'
          >
            <Image 
                borderRadius='full'
                boxSize='150px'
                src={user.pic}
                alt={user.name}
            />
            <Text 
                fontSize={{base: "28px", md: '30px'}}
                fontFamily='Silkscreen'
            >
                Email: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal