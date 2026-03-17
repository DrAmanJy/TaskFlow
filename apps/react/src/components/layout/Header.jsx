import React, { useState } from "react";
import { Zap, Menu, X } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-indigo-600" : "text-slate-600 hover:text-indigo-600"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block text-left text-sm font-medium transition-colors ${
      isActive ? "text-indigo-600" : "text-slate-600 hover:text-indigo-600"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              NexusWork
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/architecture" className={navLinkClass}>
              Architecture
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={() => navigate("/auth?mode=login")}
              variant="secondary"
            >
              Log in
            </Button>
            <Button onClick={() => navigate("/auth?mode=signup")}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            {/* 1. Standard Button to open the drawer (No DrawerTrigger) */}
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-600"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* 2. The Drawer itself */}
            <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
              <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-64 rounded-none">
                <DrawerHeader className="flex flex-row justify-between items-center border-b border-slate-200 pb-4 text-left">
                  <div className="flex flex-col">
                    <DrawerTitle className="text-slate-900">Menu</DrawerTitle>
                    <DrawerDescription className="sr-only">
                      Navigation links for mobile viewing
                    </DrawerDescription>
                  </div>

                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5 text-slate-600" />
                    </Button>
                  </DrawerClose>
                </DrawerHeader>

                <div className="flex flex-col space-y-4 p-4 mt-2">
                  <NavLink
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className={mobileNavLinkClass}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/architecture"
                    onClick={() => setIsOpen(false)}
                    className={mobileNavLinkClass}
                  >
                    Architecture
                  </NavLink>
                  <NavLink
                    to="/about"
                    onClick={() => setIsOpen(false)}
                    className={mobileNavLinkClass}
                  >
                    About
                  </NavLink>

                  <hr className="border-slate-100 my-2" />

                  <Link
                    to="/auth?mode=login"
                    onClick={() => setIsOpen(false)}
                    className="text-left text-sm font-medium text-slate-600 hover:text-indigo-600"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    onClick={() => setIsOpen(false)}
                    className="w-full"
                  >
                    <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
