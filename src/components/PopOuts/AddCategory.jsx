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
import CategoryForm from "../Forms/categoryForm";
import { Separator } from "../ui/separator";
import { useState } from "react";

export function AddCategory() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open = {open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add-Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <Separator/>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>

        <CategoryForm setOpen = {setOpen} />
      </DialogContent>
    </Dialog>
  );
}
