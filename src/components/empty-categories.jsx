import { FolderOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AddCategory } from "./PopOuts/AddCategory"

export default function EmptyCategories() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="rounded-full bg-muted p-3 mb-4">
        <FolderOpen className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No categories found</h3>
      <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
        It looks like there are no categories available at the moment. Why not create one to get started?
      </p>
      <AddCategory/>
    </div>
  )
}
