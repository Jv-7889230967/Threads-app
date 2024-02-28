"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { ConnectToDB } from "../mongoose"

interface Props{
    userId:string,
    username:string,
    name:string,
    bio:string,
    image:string,
    path:string,
}

export async function updateUser({userId,username,name,bio,image,path}:Props): Promise<void>
{
    ConnectToDB();
 try {
    await User.findOneAndUpdate({id:userId},{
        username:username.toLowerCase(),
        name,
        bio,
        image,
        onboarded:true,
    },{
        upsert:true,
    })
    if(path==='/profile/edit')
    {
        revalidatePath(path);
    }
 } catch (error:any) {
    throw new Error(`failed to process request:${error.message}`);
 }
}

export async function fetchUser(userId:string)
{
    try 
    {
      ConnectToDB();
      return await User.findOne({id:userId});
    } 
    catch (error:any) {
        throw new Error(`Faced a issue:${error.message}`);
    }
}