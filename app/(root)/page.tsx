import PostCard from "@/components/cards/PostCard";
import { fetchPosts } from "@/lib/actions/thread.actions"
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const result=await fetchPosts(1,30);
  const user=await currentUser();
  console.log(result);
  return (
    <>
    <section className="mt-10 flex flex-col gap-10">
     {result.posts.length===0?
    (<p className="no-result">No Posts Found</p>)
    :(
      <>
      {result.posts.map((post)=>(
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
      ))}
      </>
    )}
    </section>
    </>
  );
}
