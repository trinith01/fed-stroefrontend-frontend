import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Nabar";
import Footer from "./Footer";
import { Toaster } from "./ui/sonner";

function Layout() {

  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-10">
        <Navbar  />
      </header>

      {/* Main content area */}
      <main className="flex flex-col flex-1 pt-16"> {/* Adjusted padding here */}
        <Outlet  />
        <Toaster  richColors/>
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
