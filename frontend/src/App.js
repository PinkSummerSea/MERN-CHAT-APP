import './App.css';
import { Button } from '@chakra-ui/react'
import {Route} from 'react-router-dom'
import Homepage from './Pages/Homepage';
import ChatPage from './Pages/ChatPage';
import { ChatState } from './Context/ChatProvider';
function App() {
  const {user, chats} = ChatState()
  return (
      <div className="App">
        <Route exact path='/' component={Homepage}/>
        <Route path='/chats'><ChatPage user={user} chats={chats}/></Route>
      </div>
  );
}

export default App;
