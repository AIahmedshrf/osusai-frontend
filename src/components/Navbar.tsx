// src/components/Navbar.tsx
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

// Updated route list to use paths for the router
const routeList = [
  { to: "/solutions", label: "Solutions" },
  { to: "/products", label: "Products" },
  { to: "/resources", label: "Resources" },
  // Add other routes here as you build them
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-background/50 backdrop-blur-lg">
      <nav className="container flex items-center justify-between h-14">
        {/* Links on the left for desktop */}
        <div className="hidden md:flex gap-4">
          {routeList.map((route) => (
            // Use Link component here
            <Link
              to={route.to}
              key={route.label}
              className={`text-[17px] ${buttonVariants({ variant: "ghost" })}`}
            >
              {route.label}
            </Link>
          ))}
        </div>

        {/* Logo in the center, links to Home */}
        <div className="absolute left-1/2 -translate-x-1/2">
          {/* Use Link component here for the logo */}
          <Link to="/" className="text-xl font-bold">
            Osusai
          </Link>
        </div>
        
        {/* Buttons on the right for desktop */}
        <div className="hidden md:flex gap-2">
          <a
            href="#" // External or special links can remain as 'a' tags
            className={`border ${buttonVariants({ variant: "secondary" })}`}
          >
            Watch Demo
          </a>
          <a
            href="#"
            className={buttonVariants({ variant: "default" })}
          >
            Start For Free
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden absolute top-14 left-0 w-full bg-background flex flex-col items-center gap-4 py-4 border-b">
            {routeList.map((route) => (
              // Use Link component in mobile menu too
              <Link to={route.to} key={route.label} onClick={() => setIsOpen(false)}>
                {route.label}
              </Link>
            ))}
             <a href="#" className={`border ${buttonVariants({ variant: "secondary" })}`}>
              Watch Demo
            </a>
            <a href="#" className={buttonVariants({ variant: "default" })}>
              Start For Free
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};