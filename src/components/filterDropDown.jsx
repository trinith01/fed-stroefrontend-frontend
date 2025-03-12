

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FilterDropdown() {
  const handleFilter = (value) => {
    // Implement filter functionality here
    console.log("Filtering by category:", value)
  }

  return (
    <Select onValueChange={handleFilter}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        <SelectItem value="electronics">Electronics</SelectItem>
        <SelectItem value="clothing">Clothing</SelectItem>
        <SelectItem value="books">Books</SelectItem>
        {/* Add more categories as needed */}
      </SelectContent>
    </Select>
  )
}

