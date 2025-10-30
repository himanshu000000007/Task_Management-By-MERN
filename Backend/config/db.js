import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/taskify')
    .then(()=>console.log('DB connected'));
}