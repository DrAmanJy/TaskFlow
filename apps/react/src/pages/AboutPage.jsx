import React from 'react';
import { Shield, Zap, ListTodo, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" /> About NexusWork
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Empowering Teams to Achieve More
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 mx-auto max-w-2xl">
            NexusWork is a comprehensive project and task management platform designed to streamline collaboration, tracking, and execution for modern teams.
          </p>
          <Link to="/auth?mode=signup">
            <Button size="lg" className="rounded-full px-8 bg-indigo-600 hover:bg-indigo-700">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Overview */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 border border-slate-200 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
              <ListTodo className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Kanban Boards</h3>
            <p className="text-slate-600">
              Visualize your workflow with intuitive drag-and-drop boards to keep every task moving forward seamlessly.
            </p>
          </div>
          <div className="bg-white p-8 border border-slate-200 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Team Collaboration</h3>
            <p className="text-slate-600">
              Assign tasks, leave comments, and track progress together in real time, no matter where your team is.
            </p>
          </div>
          <div className="bg-white p-8 border border-slate-200 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure Architecture</h3>
            <p className="text-slate-600">
              Built on a robust MERN stack with modern authentication to ensure your project data is always safe and accessible.
            </p>
          </div>
        </div>
      </div>

      {/* Developer Section */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-24 text-center">
        <h2 className="text-3xl font-bold mb-6">Built by DrAmanJy/TaskFlow</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          This platform was developed as part of a comprehensive monorepo architecture, leveraging React, Express, MongoDB, and TailwindCSS to deliver a fast, responsive user experience out of the box.
        </p>
      </div>
    </div>
  );
}
