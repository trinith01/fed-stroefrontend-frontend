import {
  useState,
  useEffect
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
import { useGetCategoryByIdQuery, useUpdateCategoryByIdMutation ,useGetAllCategoriesQuery } from "@/lib/api"

const formSchema = z.object({
  category: z.string()
    .min(3, "Category must be at least 3 characters long.")
    .max(50, "Category must be at most 50 characters long.")
});

export default function CategoryUpdateForm({ setOpen, id }) {
  // Fetching data for pre-filled category name
  const { data: beforeUpdateData, isLoading: isFetching } = useGetCategoryByIdQuery(id);

  // Mutation for updating the category
  const [updateCategoryById, { isLoading: isUpdating }] = useUpdateCategoryByIdMutation();
  const {data_main ,refetch} = useGetAllCategoriesQuery();

  // Form setup using react-hook-form with zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { category: "" } // Start with empty default value
  });

  // Reset form values once data is fetched
  useEffect(() => {
    if (beforeUpdateData?.data?.category) {
      form.reset({ category: beforeUpdateData.data.category });
    }
  }, [beforeUpdateData, form]);

  // Form submission handler
    async function onSubmit(values) {
    console.log("Updating category with values:", values.category);
    try {
        await updateCategoryById({ id, updatedCategory:values});

      
        toast.success("Category updated successfully!");
        refetch();
        setOpen(false);
        form.reset();

    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    }
   }


  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Electronics" 
                  type="text" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Please provide the name of the category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isUpdating}>Submit</Button>
      </form>
    </Form>
  );
}
