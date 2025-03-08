import React from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <div className='fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 p-2 bg-black text-white'>
      <Link to='/'>
        <img src="/photon.png" alt="logo" className='h-12 cursor-pointer opacity-75 mr-auto invert' draggable={false} />
      </Link>
      {authUser && <div className='flex items-center gap-4 ml-auto'>
        <Link to='/profile'>
          <img src={authUser?.profilePic} className='w-8 h-8 object-cover rounded-full border hover:scale-105 transition'/>
        </Link>
        <div className='cursor-pointer flex p-1 px-2 opacity-85 bg-[#1a1a1a] gap-2 border-[1.5px] border-[#ffffffc0] rounded-lg hover:bg-[#000000]' onClick={logout}>
          <div className='text-sm md:text-base'>Logout</div>
          <img src="/logout.png" className='h-4 md:h-5'/>
        </div>
      </div>
      }
    </div>
  )
}

export default Navbar