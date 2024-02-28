import React from 'react'
import { currentUser } from '@clerk/nextjs';
import {redirect } from 'next/navigation';
import { fetchUser } from '@/lib/actions/user.actions';
import PostThread from '@/components/forms/PostThread';
const page = async() => {
    const user=await currentUser();

    if(!user) return null;

    const userInfo=await fetchUser(user.id);
    const userId=userInfo._id;
    if(!userInfo?.onboarded)
    {
        redirect('/onboarding');
    }
  return (
    <>
    <div className='head-text'>Create Thread</div>
    <PostThread userId={userId}/>
    </>
  )
}

export default page