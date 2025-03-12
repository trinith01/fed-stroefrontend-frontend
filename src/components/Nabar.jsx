import { useState } from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  useClerk,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { ShoppingCart } from "lucide-react";

import { ModeToggle } from "./mode-toggle";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  // const {cartCount} =useCart();
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const cartCount_re = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md border-b border-border shadow-md">
      <div className=" mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Brand & Navigation Links */}
          <div className="flex items-center justify-start gap-6">
            {/* Brand Logo */}
            <div className="text-primary text-2xl font-bold">
              <Link to="/">Mebius</Link>
            </div>

            <div className="flex gap-3 items-center">
              <SignedIn>
                {user?.publicMetadata?.role === "admin" && (
                  <Link to="/admin">Admin</Link>
                )}
              </SignedIn>
              <Link
                className="text-foreground hover:text-muted-foreground"
                to="/"
              >
                Home
              </Link>
              <Link
                className="text-foreground hover:text-muted-foreground"
                to="/shop"
              >
                Shop
              </Link>
              <Link
                className="text-foreground hover:text-muted-foreground"
                to="/favourite"
              >
                Favourites
              </Link>
            </div>
          </div>

          {/* Right Section: Account & Sign In/Out */}
          <div className="hidden md:flex space-x-6">
            <ModeToggle></ModeToggle>
            <Link
              className="bloc text-foreground hover:text-muted-foreground flex gap-1"
              to="/cart"
            >
              {cartCount_re} <ShoppingCart /> Cart{" "}
            </Link>
            <SignedIn>
              <Link
                className="block text-foreground hover:text-muted-foreground"
                to="/account"
              >
                Account
              </Link>
              <UserButton />
              <h1 className="text-blue-500">
                {isSignedIn ? user.username : ""}
              </h1>
            </SignedIn>

            <SignedOut>
              <Link
                className="text-foreground hover:text-muted-foreground"
                to="/sign-in"
              >
                Sign In
              </Link>
              <Link
                className="text-foreground hover:text-muted-foreground"
                to="/sign-up"
              >
                Sign Up
              </Link>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground focus:outline-none"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/80 backdrop-blur-md border-t border-border p-4 space-y-3">
          <SignedIn>
            <UserButton />
            <Link
              className="block text-foreground hover:text-muted-foreground"
              to="/account"
            >
              Account
            </Link>
          </SignedIn>

          <SignedOut>
            <Link
              className="block text-foreground hover:text-muted-foreground"
              to="/sign-in"
            >
              Sign In
            </Link>
            <Link
              className="block text-foreground hover:text-muted-foreground"
              to="/sign-up"
            >
              Sign Up
            </Link>
          </SignedOut>
          <Link
            className="block text-foreground hover:text-muted-foreground"
            to="/"
          >
            Home
          </Link>
          <Link
            className="block text-foreground hover:text-muted-foreground"
            to="/shop"
          >
            Shop
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
