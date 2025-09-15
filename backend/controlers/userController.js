import userModel from '../models/userModels.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//Login users
const loginUser = async(req,res)=>{
    const {email, password} =req.body;
    try {
        //Find the user 
        const user= await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message:"User doesn't exists"})
        }
        //check the Username and password is correct or not
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false, message:"Invalid Credentials"})
        }
        const token = createToken(user._id);
        return res.json({success:true, token})
    } catch (error) {
        console,log(error)
        return res.json({success:false, message:"User doesn't exists"})
    }
}
// const createToken = (id)=>{
//     return jwt.sign({id},process.env.JWT_SECRET)
// }
const createToken = (id) => {
    console.log("JWT_SECRET inside controller:", process.env.JWT_SECRET);
    return jwt.sign({ id }, process.env.JWT_SECRET || "fallbacksecret", { expiresIn: "1h" });
};

//Register users
const registerUser = async(req,res)=>{
    const {name,email,password}= req.body;
    try {
        //checking is user already exist
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }
        //Validating emil formate & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter valid email "})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //Hashing user password
        const salt= await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        //Save user
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        });
       const user= await newUser.save()

       //Create Token
       const token =createToken(user._id)
       
       console.log("Generated Token",token)
       res.json({success:true,
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        },
        token,
       });
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
export {registerUser,loginUser}