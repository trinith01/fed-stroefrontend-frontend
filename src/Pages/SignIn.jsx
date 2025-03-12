import React from 'react';
import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-background text-foreground">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
        
        <SignIn />
      </div>
    </div>
  );
}

export default SignInPage;
