import { Input } from "@/components/ui/input";
import React from "react"; // Added import for React

export default function SearchBar() {
  const handleSearch = (event) => {
    // Implement search functionality here
    console.log("Searching for:", event.target.value);
  };

  return (
    <Input
      type="text"
      placeholder="Search products..."
      onChange={handleSearch}
      className="max-w-sm"
    />
  );
}
