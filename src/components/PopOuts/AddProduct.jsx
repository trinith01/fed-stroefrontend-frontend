import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProductForm from "../Forms/productForm";
import { Separator } from "../ui/separator";
import { useState } from "react";

export function AddProduct() {
  const [open , setOpen] = useState(false)
  return (
    <Dialog open ={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add-Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader >
          <DialogTitle>Add a New Product to the Inventory 🏷️</DialogTitle>
          <Separator/>
         
        </DialogHeader>

        <ProductForm  setOpen ={setOpen}/>
      </DialogContent>
    </Dialog>
  );
}
