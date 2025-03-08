import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js';
import { getRecieverSocketId, io } from '../lib/socket.js';

export const getUsersForSidebar = async(req, res) =>{
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}});
        return res.status(200).json(filteredUsers);
    }catch(error){
        console.log("Error in getUsersForSidebar Controller", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export const getMessages = async(req, res) =>{
    try {
        const myId = req.user._id;
        const otherUserId = req.params.id;
        const messages = await Message.find({
            $or: [
                {senderId: myId, recieverId: otherUserId},
                {senderId: otherUserId, recieverId: myId},
            ],
        }).sort({createdAt: 1});
        return res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages Controller", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export const sendMessage = async(req, res) =>{
    try {
        const senderId = req.user._id;
        const recieverId = req.params.id;
        const {text, image} = req.body;
        let uploadedImage;

        if(image){
            uploadedImage = await cloudinary.uploader.upload(image);
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: uploadedImage? uploadedImage.secure_url: null,
        });
        newMessage.save();

        //socket.io functionality to emit message
        const recieverSocketId = getRecieverSocketId(recieverId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage Controller", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};