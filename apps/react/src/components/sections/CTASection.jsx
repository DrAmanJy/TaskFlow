import React from "react";
import { useNavigate } from "react-router-dom";

const CTASection = (navigateTo) => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-600 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
            <div className="w-64 h-64 rounded-full bg-indigo-500 opacity-50 blur-2xl"></div>
          </div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
            <div className="w-64 h-64 rounded-full bg-indigo-700 opacity-50 blur-2xl"></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to transform how your team works?
            </h2>
            <p className="text-indigo-100 text-lg mb-8">
              Join thousands of teams already using NexusWork to streamline
              their projects and boost productivity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate(navigateTo)}
                className="w-full sm:w-auto rounded-full bg-white px-8 py-3.5 text-base font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors shadow-lg"
              >
                Create your free account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
