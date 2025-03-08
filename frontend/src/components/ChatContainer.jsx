import React, {useState, useEffect, useRef} from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import MessageInput from './MessageInput';


const ChatContainer = () => {
  const { selectedUser, getMessages, messages, isMessagesLoading, subscribeToMessages, ubsubscribeToMessages} = useChatStore();
  const {onlineUsers} = useAuthStore();
  const messagesEndRef = useRef(null);
  useEffect(()=>{
    if(selectedUser){
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return ()=>{
      ubsubscribeToMessages();
    }
  },[selectedUser._id, getMessages, subscribeToMessages, ubsubscribeToMessages]);

  useEffect(() => {
    if(messagesEndRef.current && messages){
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if(isMessagesLoading){
    return(
      <div className='w-full h-full flex justify-center items-center font-bold bg-black text-white opacity-75'>Loading...</div>
    )
  }

  return (
    <div className='flex-1 flex flex-col rounded-lg h-full'>

      <div className='bg-black text-[#ffffffad] p-2 px-4 gap-4 flex items-center justify-start'>
        <div className='size-9 rounded-full bg-white'>
          <img src={selectedUser?.profilePic} alt="profile" className='w-full h-full object-cover rounded-full'/>
        </div>
        <div className='flex flex-col'>
          <div className='font-bold'>{selectedUser?.fullName}</div>
          <div className={`text-xs opacity-85 ${onlineUsers.includes(selectedUser?._id) ? "text-green-500" : "text-red-500"}`}>
            {onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}
          </div>
        </div>
      </div>

      {/* Message Box */}
      <div  className='flex md:border-l-[2px] custom-scrollbar md:border-[#ffffff1e] flex-col h-[calc(100vh-25.5rem)] sm:h-[calc(100vh-26rem)] md:max-h-full md:flex-1 overflow-y-auto p-4 gap-4'>
        {messages.map(message=>(
            <div ref={messagesEndRef} key={message._id} className={`flex flex-col gap-1 ${message.senderId===selectedUser._id ? "items-start" : "items-end"}`}>
              { message.createdAt ? (
                  <div className='text-xs text-gray-500'>
                    {new Date(message.createdAt).toLocaleDateString([], { day: '2-digit', month: 'long', year: 'numeric' })} <span className='mx-1 text-blue-800'>
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span> 
                  </div>
                ):(
                  <div className='text-xs text-green-800'>Just now</div>
                ) 
              }
              {message.text.length>0 && <div className={`p-2 text-sm md:text-base rounded-lg ${message.senderId===selectedUser._id ? "bg-[#ffffff1f] text-[#ffffffdb]" : "bg-[#fcfcfcd5] text-black"}`}>
                {message.text}
              </div>}

              {
                message.image && (
                  <img src={message.image} alt="message" className='w-64 h-64 object-cover rounded-lg'/>
                )
              }
            </div>
          ))
        }
      </div>
      
      <MessageInput />
      
    </div>
  )
}

export default ChatContainer