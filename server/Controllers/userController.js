const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (_id) =>{
    const jwtKey = process.env.JWT_SECRET_KEY;
    return  jwt.sign({_id}, jwtKey, {expiresIn: "3d"})
}
//create user
const registerUser = async(req, res)=>{
    try{
 const {name, email, password} = req.body;

 let user = await userModel.findOne({email});

 if(user) return res.status(400).json("User with given email already exist");

 if(!name || !email || !password) return res.status(400).json("All fields are required")

 if(!validator.isEmail(email)) return res.status(400).json("Enter valid Email");

 if(!validator.isStrongPassword(password)) return res.status(400).json("Enter strong password");

 user = new userModel({name, email, password})

 const salt = await bcrypt.genSalt(10);
 user.password = await bcrypt.hash(user.password, salt);

 await user.save();

const token = createToken(user._id);
res.status(200).json({_id: user._id, name, email, token})
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }

}
//login user
const loginUser = async(req, res)=>{
    const{email, password} = req.body;

    try{
        let user = await userModel.findOne({email});
        if(!user) return res.status(400).json("Invalid email or password")
    
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) return res.status(400).json("Invalid Email or Password")
        const token = createToken(user._id);
        res.status(200).json({_id: user._id, name: user.name, email, token})
    
    }catch(error){
        res.status(500).json(error)
    }
}

//find user
const findUser = async(req, res)=>{
    const userId = req.params.userId;
    try{
        const user = await userModel.findById(userId);
        res.status(200).json(user)
    }catch(error){
        res.status(500).json(error)
    }
}
// fetch users
const getUsers = async(req, res)=>{
    try{
        const user = await userModel.find();
        res.status(200).json(user)
    }catch(error){
        res.status(500).json(error)
    }
}

module.exports = {registerUser, loginUser, findUser, getUsers}