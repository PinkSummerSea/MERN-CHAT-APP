import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../Context/ChatProvider'
import { Avatar, Tooltip } from '@chakra-ui/react'

const ScrollableChat = ({messages}) => {
  const {user} = ChatState()
  return (
    <ScrollableFeed>
        {messages && messages.map((m, i) => (
      
            <div
                style={{display: 'flex', marginBottom: '5px'}}
                key={m._id}
            >   

                    {(m.sender._id != user._id)&&(
                      <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                        <Avatar size='sm' mt='7px' cursor="pointer" mr={1} name={m.sender.name} src={m.sender.pic}/>
                      </Tooltip>
                    )}
                    <span
                        style={{backgroundColor: m.sender._id === user._id ? "lavender" : "skyblue", 
                        borderRadius: '20px',
                        padding: '5px 15px',
                        maxWidth: '75%',
                        marginLeft: m.sender._id === user._id ? "auto" : 0,
                        
                     
                    }}
                    >{m.content}</span>
               
            </div>
 
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat