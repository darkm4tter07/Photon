import {useState, useEffect} from 'react';
import { useAuthStore } from '../store/useAuthStore';
import Sidebar from '../components/Sidebar';

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
   <div className='w-full h-screen pt-16 p-4 flex justify-center items-center'>
    <div className='bg-black flex flex-col p-4 rounded-lg text-[#ffffffc1] items-center justify-center'>
      <div className='font-bold text-3xl py-4 pb-8'>Profile</div>
      <div className='flex md:flex-row flex-col'>
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={selectedImg || authUser.profilePic || "/photon.png"}
              alt="Profile"
              className="size-32 rounded-full object-cover border-4 "
            />
            <label
              htmlFor="avatar-upload"
              className={`
                absolute bottom-0 right-0 
                bg-base-content hover:scale-105
                p-2 rounded-full cursor-pointer 
                transition-all duration-200
                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
              `}
            >
              <div className='font-bold bg-black size-8 rounded-full border-[2px] text-white text-lg flex justify-center items-center'>+</div>
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <div className="text-sm text-zinc-400 text-center font-light">
              {isUpdatingProfile ? "Uploading..." : "Click the plus icon to update your photo"}
          </div>
          <div className="mt-6 bg-base-300 rounded-xl py-3 md:scale-100 scale-90">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since {authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-start justify-center px-6 gap-4 pb-4'>
          <div className='flex md:flex-col gap-2 justify-between items-center md:items-start'>
            <div className='font-bold'>Full Name:</div>
            <div className='p-2 border-[2px] rounded-lg opacity-65 md:w-80 text-sm md:text-base'>{authUser.fullName}</div>
          </div>
          <div className='flex md:flex-col justify-between gap-2 items-center md:items-start'>
            <div className='font-bold'>Email:</div>
            <div className='p-2 border-[2px] rounded-lg opacity-65 md:w-80 text-sm md:text-base'>{authUser.email}</div>
          </div>
        </div>
      </div>
      
    </div>
   </div>
  )
}

export default Profile