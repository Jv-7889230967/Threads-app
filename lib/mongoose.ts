import mongoose from 'mongoose';


let isConnect=false;

export const ConnectToDB=async()=>{
  mongoose.set('strictQuery',true);
  if(!process.env.NEXT_PUBLIC_MONGO_URI) return console.log("Mongo url is not available");
  if(isConnect) return console.log("Already Connected");

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI)
    isConnect=true;
    console.log("DB Connected");

  } 
  catch (error) {
    console.log(error);
  }
}