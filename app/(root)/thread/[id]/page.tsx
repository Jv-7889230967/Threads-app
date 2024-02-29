import PostCard from "@/components/cards/PostCard"
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const page=async ({params}:{params:{id:string}})=>{
    if(!params.id) return null;
    const user=await currentUser();
     if(!user) return null;
     const userInfo=await fetchUser(user.id);
     if(!userInfo?.onboarded)
     {
        redirect('/onboarding');
     }
     
  return(
    <section className="realtive">
        <div>
       <PostCard
       key={post._id}
       id={post._id}
       currentUserId={user?.id}
       parentId={post.parentId}
       content={post.text}
       author={post.author}
       community={post.community}
       createdAt={post.createdAt}
       comments={post.children}
       />    
        </div>
    </section>
  )
}
export default page;