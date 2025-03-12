"use client"
import {
  useState
} from "react"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import { useCreateCategoryMutation ,useGetAllCategoriesQuery } from "@/lib/api"

const formSchema = z.object({
    category: z.string()
      .min(3, "Category must be at least 3 characters long.")
      .max(50, "Category must be at most 50 characters long.")
  });
  

export default function CategoryForm( {setOpen}) {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
    const { data,refetch  } = useGetAllCategoriesQuery();

  const form = useForm  ({
    resolver: zodResolver(formSchema),
    defaultValues: { category: "" }

  })

  async function onSubmit(values ) {
    try {
        await createCategory(values).unwrap();
     
      toast.success("Form submitted successfully!");
      form.reset();
      refetch();
      setOpen(false);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CategoryName</FormLabel>
              <FormControl>
                <Input 
                placeholder="electronics"
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}