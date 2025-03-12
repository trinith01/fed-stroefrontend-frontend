import { Link } from "react-router-dom";
import { Facebook, FacebookIcon, Instagram, Twitter, Youtube} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background/80 backdrop-blur-md border-t border-border shadow-md py-6">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          
          {/* Logo / Brand Name */}
          <div className="text-primary text-lg font-bold">
            Mebius
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link className="text-foreground hover:text-muted-foreground" to="/">Home</Link>
            <Link className="text-foreground hover:text-muted-foreground" to="/about">About</Link>
            <Link className="text-foreground hover:text-muted-foreground" to="/services">Services</Link>
            <Link className="text-foreground hover:text-muted-foreground" to="/contact">Contact</Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-foreground hover:text-primary">
              <FacebookIcon />{/* Replace with an actual icon */}
            </a>
            <a href="#" className="text-foreground hover:text-primary">
              <Instagram/>
            </a>
            <a href="#" className="text-foreground hover:text-primary">
              <Twitter/>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MyBrand. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
