import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/util.js';
import cloudinary from '../lib/cloudinary.js';

const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });
        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        }else{
            return res.status(400).json({message: "Failed to create user"});
        }

    } catch (error) {
        console.log("Error in Signup Controller", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }
        generateToken(user._id, res);

        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic, 
        });

    } catch (error) {
        console.log("Error in Login Controller", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in Logout Controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const updateProfile = async(req, res) => {
    try{
        const {profilePic} = req.body;
        const userId = req.user._id; //coming from protectRoute middleware
        if(!profilePic){
            return res.status(200).json({message: "Profile Pic not updated"});
        }
        const profileUrl = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: profileUrl.secure_url}, {new: true});
        if(updatedUser){
            return res.status(200).json(updatedUser);
        }
    } catch (error) {
        console.log("Error in Update Profile Controller", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

const checkAuth = (req, res) => {
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error in Check Auth Controller", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export { signup, login, logout, updateProfile, checkAuth };