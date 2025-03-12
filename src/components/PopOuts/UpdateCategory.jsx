import { Pencil } from "lucide-react";

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

import { Separator } from "../ui/separator";
import { useState } from "react";
import CategoryUpdateForm from "../Forms/categoryUpdateForm";

export  default function UpdateCategory({id}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit category</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <Separator />
        
        </DialogHeader>

        <CategoryUpdateForm setOpen={setOpen}  id= {id}/>
      </DialogContent>
    </Dialog>
  );
}
