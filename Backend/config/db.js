import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://akshaysinghrajput545_db_user:taskmanagement@cluster0.pkigetm.mongodb.net/taskify')
    .then(()=>console.log('DB connected'));
}