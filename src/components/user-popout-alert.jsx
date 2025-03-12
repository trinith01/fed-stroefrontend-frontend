

import { useNavigate } from "react-router-dom"
import { AlertCircle } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"




export function AuthPopupAlert({ isOpen, onClose }) {

 const navigate = useNavigate()

  const handleSignIn = () => {
    navigate("/sign-in")
    onClose()
  }

  const handleSignUp = () => {
    navigate("/sign-up")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Authentication Required
          </DialogTitle>
          <DialogDescription>
            You need to be signed in to make a purchase. Please sign in or create an account to continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSignUp}>
              Sign Up
            </Button>
            <Button onClick={handleSignIn}>Sign In</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

