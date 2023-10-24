'use client'
import { useRouter } from 'next/navigation'

import axios from "axios"
import qs from "query-string"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'

import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import FieldUpload from '@/components/file-upload'
import { useModal } from '@/hooks/user-modal.store'

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Attachment is required"
  })
})

const MessageFileModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const { apiUrl, query } = data
  const router = useRouter()

  const isModalOpen = isOpen && type === "messageFile"

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:{
      fileUrl:""
    }
  })

  const handleClose = () => {
    form.reset()
    onClose() 
  }

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      })
      await axios.post(url,{
        ...values,
        content:values.fileUrl
      })
      form.reset()
      router.refresh()
      handleClose()
    } catch (error) {
      
    }
    
  }


  return ( 
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Add an attachment
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Send a file as a message
          </DialogDescription>
        </DialogHeader>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                {/* Todo: Image Upload */}
                <FormField
                  control={form.control}
                  name='fileUrl'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FieldUpload
                          endpoint="messageFile"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className='bg-gray-100 px-6 py-4'>
              <Button
                variant={'primary'}
                disabled={isLoading}
              >
                  Send
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
   );
}
 
export default MessageFileModal;