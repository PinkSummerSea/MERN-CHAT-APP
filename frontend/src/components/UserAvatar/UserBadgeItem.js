import { Box } from '@chakra-ui/react'
import React from 'react'
import { CloseIcon } from '@chakra-ui/icons'

const UserBadgeItem = ({user, admin, handleFunction}) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      backgroundColor='purple.100'
      color='gray.600'
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <CloseIcon pl={1} />
    </Box>
  )
}

export default UserBadgeItem