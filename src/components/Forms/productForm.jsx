import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAddProductMutation, useGetAllCategoriesQuery  ,useGetProductsQuery} from "@/lib/api";

// Form validation schema
const formSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  img: z.string().min(1, "Image is required"),
  price: z.coerce.number().min(0, "Sell price must be a positive number"),
  offerPrice: z.coerce.number().min(0, "Offer price must be a positive number"),
  initialStockCount: z.coerce.number().min(0, "Initial count must be a positive number"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export default function ProductForm( {setOpen}) {
  const { data: res } = useGetAllCategoriesQuery();
  const [addProduct, { isLoading }] = useAddProductMutation();
  const{refetch} = useGetProductsQuery();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      category: "",
      img: "",
      price: 0,
      offerPrice: 0,
      initialStockCount: 0,
      description: "",
    },
  });

  async function onSubmit(values) {
    try {
      await addProduct(values).unwrap();
      toast.success("Submitted Successfully");
      setOpen(false);
      refetch();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }
  

  return (
    <div className="max-w-lg mx-auto p-6 shadow-lg bg-white rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Product Info Section */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Nike Shoes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {res?.data?.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Pricing Section */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sell Price (LKR)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="2999.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="offerPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offer Price (LKR)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="2000.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Inventory Section */}
          <FormField
            control={form.control}
            
            name="initialStockCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Stock Count</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image & Description Section */}
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="img-link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter product details" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="text-right">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
