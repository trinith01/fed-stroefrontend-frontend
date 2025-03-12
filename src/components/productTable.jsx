import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Pen, Trash, Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useGetProductsQuery ,useDeleteProductMutation } from "@/lib/api"
import { toast } from "sonner"

export default function ProductTable({products}) {
  

  

  // Helper function to calculate remaining stock
  const calculateRemainingStock = (product) => product.initialStockCount - product.saleCount
  const handleDelete = async(id) => {
    try{

      const response = await deleteProduct(id).unwrap()
      toast.success(`Product deleted successfully`);
      refetch()
    }catch(err){
      console.log(err)
      toast.err(`Error deleting product`)
    }
    
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Sell Price</TableHead>
            <TableHead className="text-right">Offer Price</TableHead>
            <TableHead className="text-right">Initial Count</TableHead>
            <TableHead className="text-right">Sale Count</TableHead>
            <TableHead className="text-right">Remaining Count</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell className="font-medium">{product.productName}</TableCell>
              <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
              <TableCell className="text-right">${product.offerPrice.toFixed(2)}</TableCell>
              <TableCell className="text-right">{product.initialStockCount}</TableCell>
              <TableCell className="text-right">{product.saleCount}</TableCell>
              <TableCell className="text-right">{calculateRemainingStock(product)}</TableCell>
              <TableCell>{product.category.category}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  < Link to = {`/product/${product._id}` }>
                    <Eye className="h-4 w-4" />
                    
                  </Link>
                  <Button variant="ghost" size="icon">
                    <Pen className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick = {() => handleDelete(product._id)}>
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
