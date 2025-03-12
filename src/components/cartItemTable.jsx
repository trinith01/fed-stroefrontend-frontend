import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Img from "../assets/product.jpg";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

import { useDispatch ,useSelector } from "react-redux";
import { decrement } from "@/lib/features/counter/counterSlice"
import { addToCart ,removeFromCart } from "@/lib/features/counter/cartSlice";


export function CartTable() {
  
  const cartItemsData = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const removeFromCartButton = (id) => {
    dispatch(decrement());
    dispatch(removeFromCart(id));
  };



    


  
  return (
    <div className="border-2 border-orange-500 shadow-lg shadow-orange-300 rounded-lg p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Product</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
           {cartItemsData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <img
                  src={item.image}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span>{item.quantity}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                ${item.offerPrice.toFixed(2)}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick = {() =>{ removeFromCartButton(item._id) }}>
                  <Delete className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>
      </Table>
    </div>
  );
}
