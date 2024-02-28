"use client"
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing';
import { updateUser } from '@/lib/actions/user.actions';
import { usePathname,useRouter } from 'next/navigation';


interface Props{
    user:{
        id:string;
        objectId:string;
        username: string;
        name: string;
        bio: string;
        image: string;
    },
    btnTitle:string;
}

const AccountProfile=({user,btnTitle}:Props)=>{
 const [files,setFiles]=useState<File[]>([]);
 const {startUpload}=useUploadThing("media");
 const [loading,setLoading]=useState<boolean>(false);
 const pathname=usePathname();
 const router=useRouter();

    const onSubmit=async(values: z.infer<typeof UserValidation>)=> {

    try {
      setLoading(true);
      const image=values.profile_photo;
      const hasChanged=isBase64Image(image);
      if(hasChanged)
      {
           const res=await startUpload(files);
           if(res && res[0].fileUrl)
           {
            values.profile_photo=res[0].fileUrl;
           }
      }
      await updateUser(
      {
        userId:user.id,
        username:values.username,
        name:values.name,
        bio:values.bio,
        image:values.profile_photo,
        path:pathname,

      });
      if(pathname==='profile/edit')
      {
        router.back();
      }
      else{
        router.push('/');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }finally{
      setLoading(false);
    }
      }

      function handleImage(e: ChangeEvent<HTMLInputElement>,fieldChange:(value : string)=> void ){
       e.preventDefault();
       const filereader =new FileReader();
       if(e.target.files && e.target.files.length>0)
       {
        const file=e.target.files[0];
        setFiles(Array.from(e.target.files));
        if(!file.type.includes('image'))return;

        filereader.onload=async(event)=>{
const imageDataUrl=event.target?.result?.toString() || '';
   fieldChange(imageDataUrl);
        }
        filereader.readAsDataURL(file);
       }
      }
 
    const form=useForm({
        resolver:zodResolver(UserValidation),
        defaultValues:{
            profile_photo:user?.image || " ",
            name:user?.name || " ",
            username:user?.username || " ",
            bio:user?.bio || " ",
        }
    });
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">
            <FormField
              control={form.control}
              name="profile_photo"
              render={({ field }) => (
                <FormItem className='flex items-center gap-4'>
                  <FormLabel className='account-form_image-label'>{field.value?(
                    <Image 
                    src={field.value}
                    alt='profile_photo'
                    width={96} 
                    height={96} 
                    priority 
                    className='rounded-full object-contain'/>
                  ):(
                    <Image 
                    src='assets/profile.svg'
                    alt='profile_photo'
                    width={2} 
                    height={24} 
                    priority 
                    className='object-contain'/>
                  )}
                  </FormLabel>
                  <FormControl className='flex-1 text-base-semibold text-gray-200'>
                    <Input 
                    type='file'
                    accept='image/*'
                    placeholder='upload a image'
                    className='account-form_image-input'
                    onChange={(e)=>handleImage(e,field.onChange)}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className='flex w-full flex-col gap-3'>
                  <FormLabel className='text-base-semibold text-light-2'>
                    Name:
                  </FormLabel>
                  <FormControl>
                    <Input 
                    type='text'
                   {...field}
                   className='account-form_input no-focus'
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
               <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className='flex w-full flex-col gap-3'>
                  <FormLabel className='text-base-semibold text-light-2'>
                    UserName:
                  </FormLabel>
                  <FormControl >
                    <Input 
                    type='text'
                   {...field}
                   className='account-form_input no-focus'
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className='flex w-full flex-col gap-3'>
                  <FormLabel className='text-base-semibold text-light-2'>
                    Bio:
                  </FormLabel>
                  <FormControl>
                    <Textarea
                    rows={10}
                   {...field}
                   className='account-form_input no-focus'
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            
            <Button className={`bg-primary-500 text-light-1 ${loading?'opacity-75':''}`} type="submit">{loading?'Loading...' : 'Submit'}</Button>
          </form>
        </Form>
      )
}

export default AccountProfile;