import React from 'react';
import { useChatStore } from '../store/useChatStore';
import Sidebar from '../components/Sidebar.jsx';
import NoChatSelected from '../components/NoChatSelected.jsx';
import ChatContainer from '../components/ChatContainer.jsx';

const Home = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className='w-full h-screen'>
      <div className='flex items-center justify-center pt-20 px-4 '>
        <div className='bg-base-100 rounded-lg w-full max-w-6xl h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)]'>
          <div className='flex flex-col md:flex-row h-full rounded-lg overflow-hidden border-[2px] border-[#ffffff1e]'>
            <Sidebar/>
            {
              !selectedUser ? <NoChatSelected/> : <ChatContainer/>
            }
          </div>
        </div> 

      </div>
    </div>
    
  )
}

export default Home