import { useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, Search, Tag } from "lucide-react";
import ProductCard from "@/components/product-card";
import { useGetAllCategoriesQuery } from "@/lib/api";
import { NoProductsFound } from "@/components/noProductsFound";

export default function Favourite() {
  const fav_products = useSelector((state) => state.favourites.favItems) || [];
  console.log(fav_products)

  const { data: res } = useGetAllCategoriesQuery();
  const categories = ["All", ...new Set(res?.data?.map((category) => category.category) || [])];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(new Set(["All"]));

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

  const filteredProducts = fav_products.filter(
    (product) =>
      (selectedCategories.has("All") || selectedCategories.has(product.category.category)) &&
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-11">
      <h1 className="text-4xl font-bold text-center mb-5 text-gray-900 dark:text-white flex justify-center items-center">
        Your Favourite Products <Heart className="ml-2 text-red-500" size={32} />
      </h1>
      <Separator className="mb-6" />

      <div className="mb-6 flex flex-col md:flex-col md:items-start gap-4">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => toggleCategory(category)}
              variant={selectedCategories.has(category) ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <Tag size={16} /> {category}
            </Button>
          ))}
        </div>
        <Separator />
        <div className="relative mt-4 md:mt-0 w-full md:w-1/3">
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

      <Separator />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product._id} product={product} />)
        ) : (
          <NoProductsFound />
        )}
      </div>
    </div>
  );
}
