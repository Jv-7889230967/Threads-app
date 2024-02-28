"use client"
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from "@/components/ui/form"
import { Textarea } from '../ui/textarea';
import { usePathname,useRouter } from 'next/navigation';
import { ThreadValidation } from '@/lib/validations/threads';
import { createThread } from '@/lib/actions/thread.actions';


function PostThread({userId}:{userId:string})
{
  const pathname=usePathname();
  const router=useRouter();
   const form=useForm({
      resolver:zodResolver(ThreadValidation),
      defaultValues:{
         thread:'',
         accountId:userId
      }
  });

  const onSubmit= async(values:z.infer<typeof ThreadValidation>)=>{
    await createThread({
      text:values.thread,
      author:userId,
      communityId:null,
      path:pathname,
    })
    router.push("/");
  }
   return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex flex-col justify-start gap-10">
      <FormField
              control={form.control}
              name="thread"
              render={({ field }) => (
                <FormItem className='flex w-full flex-col gap-3'>
                  <FormLabel className='text-base-semibold text-light-2'>
                    thread
                  </FormLabel>
                  <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                    <Textarea 
                    rows={15}
                   {...field}
                   className='account-form_input no-focus'
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button type='submit' className='bg-primary-500 w-40'>
             POST
            </Button>
         </form>
         </Form>
   )
}
export default PostThread