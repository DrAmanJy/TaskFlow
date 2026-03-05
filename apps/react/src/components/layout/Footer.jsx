import React from "react";
import { Zap, Code } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                NexusWork
              </span>
            </div>
            <p className="text-sm text-slate-400">
              A comprehensive project management platform built as a portfolio
              showcase. Focusing on clean UI, smooth UX, and modern frontend
              practices.
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-sm font-medium hover:bg-slate-700 transition-colors"
            >
              <Code className="w-4 h-4" /> Source Code
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} NexusWork. Created for demonstration
            purposes.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
