import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search, Tag } from "lucide-react";
import ProductCard from "@/components/product-card";
import { useGetProductsQuery, useGetAllCategoriesQuery } from "@/lib/api";

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(
    new Set(["All"])
  );

  const { data: resProducts } = useGetProductsQuery();
  const { data: res } = useGetAllCategoriesQuery();
  const categories = [
    "All",
    ...new Set(res?.data.map((category) => category.category) || []),
  ];

  const products = resProducts?.data || [];

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

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategories.has("All") ||
        selectedCategories.has(product.category.category)) &&
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-11">
      <h1 className="text-4xl font-bold text-center mb-5 text-gray-900 dark:text-white flex">
        🛍️ Product Showroom
      </h1>
      <Separator className=" mb-6" />

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedCategories.has(category)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
              }`}
            >
              <Tag size={16} /> {category}
            </Button>
          ))}
        </div>
      </div>
      <Separator />

      <div className="flex flex-col items-start gap-3 p-4 bg-white shadow-md rounded-lg w-full max-w-md">
      <h1 className="text-lg font-semibold text-gray-800">🔍 Search by Name</h1>


        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
      </div>
      <Separator className="my-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No products found.</p>
      )}
    </div>
  );
}
