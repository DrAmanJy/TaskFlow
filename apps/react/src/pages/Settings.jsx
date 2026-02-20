import { Camera, Mail } from "lucide-react";

export default function Settings() {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Settings</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border-2 border-white shadow-sm ml-2 flex items-center justify-center text-[11px] font-bold text-white">
              AL
            </div>
          </div>
        </header>

        {/* Settings Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Settings Sidebar Menu */}
            <div className="w-full md:w-64 shrink-0">
              <nav className="flex flex-col space-y-1">
                <a
                  href="#"
                  className="px-4 py-2.5 bg-gray-100 text-gray-900 font-medium rounded-lg transition-colors"
                >
                  My Profile
                </a>
                <a
                  href="#"
                  className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium rounded-lg transition-colors"
                >
                  Security
                </a>
                <a
                  href="#"
                  className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium rounded-lg transition-colors"
                >
                  Notifications
                </a>
                <a
                  href="#"
                  className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium rounded-lg transition-colors"
                >
                  Team Members
                </a>
              </nav>
            </div>

            {/* Settings Content Panel */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Profile Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Personal Information
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Update your photo and personal details here.
                </p>

                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border-4 border-white shadow-sm flex items-center justify-center text-white text-xl font-bold">
                      AL
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-300 shadow-sm transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm mb-2">
                      Change Photo
                    </button>
                    <p className="text-xs text-gray-400">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Aman"
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Lathar"
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all text-gray-800"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input
                        type="email"
                        defaultValue="developer@example.com"
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all text-gray-800"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Role / Job Title
                    </label>
                    <input
                      type="text"
                      defaultValue="Full Stack Developer"
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all text-gray-800"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Danger Zone Card */}
              <div className="bg-red-50 rounded-xl border border-red-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-red-800 mb-1">
                    Delete Account
                  </h3>
                  <p className="text-sm text-red-600">
                    Permanently delete your account and all of your data.
                  </p>
                </div>
                <button className="bg-white border border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shrink-0">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
