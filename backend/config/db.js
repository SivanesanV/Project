import mongoose from "mongoose";

export const connectDB = async ()=>
{
    await mongoose.connect('mongodb+srv://sivanesan:7122005@cluster0.mmy8j1g.mongodb.net/project').then(()=>console.log("DBconnected"));
}