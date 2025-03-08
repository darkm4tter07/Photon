import {useState, useEffect} from 'react'
import { useChatStore } from '../store/useChatStore.js'
import { useAuthStore } from '../store/useAuthStore.js'


const Sidebar = () => {
  const { users, isUsersLoading, getUsers, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(()=>{
    getUsers();
  }, [getUsers]);


  if(isUsersLoading){
    return <div className='bg-black text-[#ffffffad] font-semibold p-4 md:h-full flex items-center justify-center'>Loading Users....</div>
  }

  return (
    <aside className="md:h-full bg-[#181818] w-full md:w-64 p-4 bg-base-100 flex flex-col text-[#ffffffad]">
      {/* Header */}
      <div className="font-bold text-2xl border-b border-[#ffffff30] pb-2 mb-2 text-center">
        Contacts
      </div>

      {/* User List */}
      <div className="overflow-x-auto custom-scrollbar md:overflow-y-auto md:h-full flex md:flex-col gap-2 md:gap-4 px-2">
        {users.map((user) => (
          <div
            key={user._id}
            className={`flex flex-col items-center md:flex-row gap-2 p-2 rounded-md cursor-pointer transition-all
              ${
                selectedUserId === user._id
                  ? 'bg-[#000000a6] text-[#ffffffb1]'
                  : 'hover:bg-[#888888]'
              }`}
            onClick={() => {
              setSelectedUser(user);
              setSelectedUserId(user._id);
            }}
          >
            <div className="relative mx-2 lg:mx-0">
              <img
                src={user.profilePic || "/photon.png"}
                alt={user.name}
                className="size-12 md:size-10 object-cover rounded-full border"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>
            <div className="text-xs md:text-base font-medium">{user.fullName}</div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar