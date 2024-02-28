"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { ConnectToDB } from "../mongoose";

interface Params{
text:string,
author:string,
communityId:string | null,
path:string,
}

export async function createThread({text, author, communityId, path}: Params) {
  try {
    ConnectToDB();
    const Created = await Thread.create({
      text,
      author,
      community:communityId,
    });
    
    await User.findByIdAndUpdate(author, {
      $push: { threads: Created._id }
    });
    
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating Thread: ${error.message}`);
  }
}

export async function fetchPosts(pageNumber=1,pageSize=20)
{
  ConnectToDB();
  const skipAmount=(pageNumber-1)*pageSize;
  const PostQuery= Thread.find({parentId:{$in:[null,undefined]}})
     .sort({createdAt:1})
     .skip(skipAmount)
     .limit(pageSize)
     .populate({path:'author',model:User})
     .populate({path:'children',
      populate:{
        path:"author",
        model:User,
        select:"_id name parentId image"
      }
    })
  
    const TotalPosts=await Thread.countDocuments({parentId:{$in:[null,undefined]}})
    const posts=await PostQuery.exec();

    const isNext=TotalPosts>skipAmount+posts.length;
    return {posts,isNext};
}
