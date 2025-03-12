"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SortDropdown() {
  const handleSort = (value) => {
    // Implement sort functionality here
    console.log("Sorting by:", value)
  }

  return (
    <Select onValueChange={handleSort}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="price_asc">Price: Low to High</SelectItem>
        <SelectItem value="price_desc">Price: High to Low</SelectItem>
        <SelectItem value="sales_asc">Sales: Low to High</SelectItem>
        <SelectItem value="sales_desc">Sales: High to Low</SelectItem>
      </SelectContent>
    </Select>
  )
}

