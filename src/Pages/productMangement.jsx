import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronRight, Package, Tag, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductTable from "@/components/productTable";
import { AddProduct } from "@/components/PopOuts/AddProduct";
import { useGetAllCategoriesQuery, useGetProductsQuery } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function ProductManagement() {
  const { user , isSignedIn } = useUser()
  const navigate = useNavigate()


 
 
  

  if(isSignedIn && user?.publicMetadata?.role !== "admin"){
    navigate("/")
  }

  const { data: res1 } = useGetProductsQuery();
  const products = res1?.data || [];
  const [selectedCategories, setSelectedCategories] = useState(new Set(["All"]));
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Search state

  const { data: res } = useGetAllCategoriesQuery();
  const categories = res?.data || [];

  const allCategories = [{ category: "All", _id: "all" }, ...categories];

  const toggleCategory = (category) => {
    const newSelectedCategories = new Set(selectedCategories);
    if (category === "All") {
      newSelectedCategories.clear();
      newSelectedCategories.add("All");
    } else {
      newSelectedCategories.has(category)
        ? newSelectedCategories.delete(category)
        : newSelectedCategories.add(category);
      newSelectedCategories.delete("All");
      if (newSelectedCategories.size === 0) newSelectedCategories.add("All");
    }
    setSelectedCategories(newSelectedCategories);
  };

  let filteredProducts = selectedCategories.has("All")
    ? products
    : products.filter((product) => selectedCategories.has(product.category.category));

  const sortProducts = (option, products) => {
    switch (option) {
      case "priceHighToLow":
        return [...products].sort((a, b) => b.price - a.price);
      case "priceLowToHigh":
        return [...products].sort((a, b) => a.price - b.price);
      case "saleCodeHighToLow":
        return [...products].sort((a, b) => b.saleCode - a.saleCode);
      case "saleCodeLowToHigh":
        return [...products].sort((a, b) => a.saleCode - b.saleCode);
      default:
        return products;
    }
  };

  filteredProducts = sortProducts(sortOption, filteredProducts);

  // Apply search filter
  filteredProducts = filteredProducts.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link to="/admin" className="flex items-center hover:text-primary transition-colors">
          <Home className="h-4 w-4 mr-2" />
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-primary font-medium">Products</span>
      </div>

      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Package className="mr-2 h-8 w-8" />
              Product Management
            </h1>
            <p className="mt-1 text-sm">Manage your product inventory</p>
          </div>
          <AddProduct />
        </div>
        <Separator className="my-6" />

        {/* Search & Sorting Section */}
        <div className="flex flex-wrap items-center gap-4 p-4  rounded-lg shadow-sm">
          {/* Search Field */}
          <div className="flex items-center gap-2">
            <label className="font-semibold">Search:</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort By:</label>
            <Select onValueChange={(value) => setSortOption(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select sorting option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
                <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                <SelectItem value="saleCodeHighToLow">Sale Code: High to Low</SelectItem>
                <SelectItem value="saleCodeLowToHigh">Sale Code: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <Separator className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Filter By Category</h2>
        <div className="flex flex-wrap gap-3">
          {allCategories.map((category) => (
            <Button
              key={category._id}
              onClick={() => toggleCategory(category.category)}
              variant={selectedCategories.has(category.category) ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <Tag className="h-4 w-4" />
              {category.category}
            </Button>
          ))}
        </div>
      </section>

      <Separator className="my-6" />

      <main>
        <ProductTable products={filteredProducts} />
      </main>
    </div>
  );
}
