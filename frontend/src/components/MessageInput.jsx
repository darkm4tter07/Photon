import React, {useState, useRef} from 'react'
import { useChatStore } from '../store/useChatStore';
import toast from 'react-hot-toast';

const MessageInput = () => {
    const [text, setText] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const {sendMessage} = useChatStore();
    const fileInputRef = useRef(null);

    const handleImageChange = (e) =>{
        const file = e.target.files[0];
        if(!file.type.startsWith('image/')){
            toast.error('Please select an image file');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () =>{
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const removeImage = () =>{
        setImagePreview(null);
        if(fileInputRef.current){
            fileInputRef.current.value = null;
        }
    }

    const handleSendMessage = async(e) =>{
        e.preventDefault();
        if(!text.trim() && !imagePreview){
            return;
        }
        try {
            await sendMessage({text: text.trim(), image: imagePreview});
            setText('');
            removeImage();
        } catch (error) {
            console.log("Failed to send message",error);
        }
    }

    return (
        <div className='w-full p-4 bg-black'>
            {/* Image Preview */}
            {imagePreview && (
                <div className='mb-3 flex items-center gap-2'>
                    <div className='relative'>
                        <img src={imagePreview} alt="preview" className='size-20 object-cover rounded-lg border border-[#ffffff69]'/>
                        <button
                            onClick={removeImage}
                            className='absolute -top-1.5 -right-1.5 size-5 rounded-full flex items-center justify-center bg-black bg-opacity-50 text-white w-6 h-6'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-3 absolute top-0 right-0 text-white bg-black bg-opacity-50 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
            <form onSubmit={handleSendMessage} className='flex items-center  gap-2'>
                <div className='flex-1 flex items-center gap-2'>
                    <input 
                        type="text" 
                        className='flex-1 bg-[#313131] p-2 outline-none rounded-lg text-[#ffffffad] placeholder:opacity-25'
                        placeholder='Type a message...'
                        value={text}
                        onChange={(e)=>setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    <button
                        type="button"
                        className={`flex cursor-pointer hover:scale-95 items-center justify-center size-10 rounded-full border 
                                    ${imagePreview ? "text-green-500 border-green-500" : "text-gray-400 border-gray-400"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <img src="/attach-file.png" className='invert opacity-50 size-6' alt="attach" />
                    </button>

                    <button
                        type="submit"
                        className="size-10 bg-white cursor-pointer flex items-center justify-center rounded-full border border-gray-400 
                                    hover:bg-gray-200 disabled:opacity-50"
                        disabled={!text.trim() && !imagePreview}
                    >
                        <img src="/send.png" className=' size-5' alt="send" />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MessageInput