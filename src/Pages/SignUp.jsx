import React from 'react'
import { SignUp } from "@clerk/clerk-react";

function SignUpPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-background text-foreground">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
        
        <SignUp />
      </div>
    </div>
  )
}

export default SignUpPage
