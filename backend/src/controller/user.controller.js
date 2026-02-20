import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide name, password and email" })
        }

        //check if user already exists
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: "User already exists with this email" })
        }

        //create new user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password, // assuming password is hashed in a real app
            loggedIn: false,
        });

        res.status(201).json({ 
            message: "User registered successfully", 
            user: {id: user._id, email: user.email, name: user.name}
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }


};

const loginUser = async (req, res) => {
    try {

        //check user exists
        const { email, password } = req.body;

        //find from user model, extract from user
        const user = await User.findOne({ 
            email: email.toLowerCase()
        });

        //user dosent exist
        if(!user) return res.status(400).json({ 
            message: "user not found" 
        });

        //compare passwords - in a real app, you'd use bcrypt or similar to compare hashed passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ 
            message: "Invalid credentials" 
        })

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id, 
                email: user.email, 
                name: user.name}
        })

    } catch (error) {
        res.status(500).json({ 
            message: "Server error", error: error.message });
    }

       
};

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ 
            email
        });

        if (!user) return res.status(404).json({ 
            message: "User not found" 
        });

        res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {
        res.status(500).json({ 
            message: "internal Server error", error });
    }

}
export { 
    registerUser, 
    loginUser,
    logoutUser 
};