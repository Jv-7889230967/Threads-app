import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  currentUserId: string | undefined;
  parentId: string | null;
  content: string;
  author: {
    id: string;
    username: string;
    name: string;
    image: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: Date;
  comments: {
    author: {
      name: string;
      image: string;
    }[];
  };
  iscomment?: boolean;
}


const PostCard = ({ id, currentUserId, parentId, content, author, community, createdAt, comments,iscomment }: Props) => {
  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
      <div className="flex items-center justify-between">
        <div className="flex w-full flex-1 flex-row gap-3">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="profile image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar"/>
          </div>
          <div>
          <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
          <h4 className=" cursor-pointer text-base-semibold text-light-1">{author.username}</h4>
            </Link>
      <h2 className="mt-2.5 text-small-regular text-light-2">{content}</h2>
           <div className="mt-5 flex flex-col gap-3">
            <div className="flex gap-3.5">
            <Image src="/assets/heart-gray.svg" alt="heart" width={24} height={24} className="cursor-pointer object-contain"/>
            <Image src="/assets/reply.svg" alt="reply" width={24} height={24} className="cursor-pointer object-contain"/>
            <Image src="/assets/repost.svg" alt="repost" width={24} height={24} className="cursor-pointer object-contain"/>
             <Image src="/assets/share.svg" alt="share" width={24} height={24} className="cursor-pointer object-contain"/>
            </div>
           </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
