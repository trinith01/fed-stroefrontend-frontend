import React, { useState } from "react";
import { useGetProductsQuery, useGetAllCategoriesQuery } from "@/lib/api";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tag } from "lucide-react";
import ProductCard from "@/components/product-card";

const Products = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();
  const { data: res } = useGetAllCategoriesQuery();

  const categories = res?.data || [];
  const allCategories = [{ category: "All", _id: "all" }, ...categories];

  const [selectedCategories, setSelectedCategories] = useState(
    new Set(["All"])
  );

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

  // Filter products by selected category
  const filteredProducts = products
    ? products.data.filter(
        (product) =>
          selectedCategories.has("All") ||
          selectedCategories.has(product?.category?.category) // ✅ safe check
      )
    : [];

  // Sort filtered products by sale count and pick top 4
  const topRatedProducts = filteredProducts
    .slice()
    .sort((a, b) => b.saleCount - a.saleCount)
    .slice(0, 4);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Spinner size="xl" color="orange" label="Loading products..." />
        <p className="text-gray-600 mt-2 text-lg">Fetching products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-red-500">
        <h2 className="text-2xl font-semibold">Something went wrong!</h2>
        <p>{error?.message || "Failed to load products."}</p>
      </div>
    );
  }

  return (
    <div>
      <section>
        <h1 className="text-3xl font-bold m-2">Our Featured Products</h1>
        <Separator />

        {/* Category Filters */}
        <div className="flex flex-wrap m-2 gap-2">
          {allCategories.map((category) => (
            <Button
              key={category._id}
              onClick={() => toggleCategory(category.category)}
              variant={
                selectedCategories.has(category.category)
                  ? "default"
                  : "outline"
              }
              className="flex items-center gap-2"
            >
              <Tag className="h-4 w-4" />
              {category.category}
            </Button>
          ))}
        </div>
        <Separator />

        {/* Product List */}
        <div className="overflow-x-auto">
          {topRatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
              {topRatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mt-2 text-lg">No products available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
