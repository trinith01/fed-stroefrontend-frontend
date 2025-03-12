import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Search, Eye, Pencil, Trash2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddCategory } from "@/components/PopOuts/AddCategory";
import { useGetAllCategoriesQuery } from "@/lib/api";
import { useDeleteCategoryByIdMutation } from "@/lib/api";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";
import UpdateCategory from "@/components/PopOuts/UpdateCategory";
import EmptyCart from "@/components/animated-empty-cart";
import EmptyCategories from "@/components/empty-categories";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
export default function CategoryManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteCategory] = useDeleteCategoryByIdMutation();
  const { user , isSignedIn } = useUser()
  const navigate = useNavigate()


 
 
  

  if(isSignedIn && user?.publicMetadata?.role !== "admin"){
    navigate("/")
  }


  const { data: res, isLoading, isError, refetch } = useGetAllCategoriesQuery();
  const categories = res?.data || [];

  if (isLoading) return < div className="text-center"><Spinner size ="md" color ="red"/></div>;
  if (isError)
    return (
      <motion.div
        className="text-center text-red-500"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg font-semibold">⚠️ Failed to load categories.</p>
      </motion.div>
    );

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id).unwrap();
      refetch();

      toast.success("Category deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link
          to="/admin"
          className="flex items-center hover:text-primary transition-colors"
        >
          <Home className="h-4 w-4 mr-2" />
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-primary font-medium">Categories</span>
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">Category Management</h1>
            <p className="mt-1 text-sm">Manage your product categories</p>
          </div>
          <AddCategory />
        </div>
      </header>

      {/* Categories Table */}
      <main>
        <div className="shadow-sm rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Product Count</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell className="font-medium">
                      {category.category}
                    </TableCell>
                    <TableCell className="text-right">10</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                        <UpdateCategory id = {category._id} />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(category._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete category</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    <EmptyCategories/>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
