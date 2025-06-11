import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Activity, Zap, Grid3X3, List, Search, Bell } from "lucide-react";
import AppGrid from "./AppGrid";
import Sidebar from "./Sidebar";
import ActivityPanel from "./ActivityPanel";
import AIPrompt from "./AIPrompt";

function Dashboard() {
  const { accounts } = useMsal();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [connectedApps, setConnectedApps] = useState([
    { id: 'outlook', name: 'Outlook', connected: true },
    { id: 'calendar', name: 'Calendar', connected: true },
    { id: 'word', name: 'Word', connected: false },
    { id: 'excel', name: 'Excel', connected: false },
    { id: 'powerpoint', name: 'PowerPoint', connected: false },
    { id: 'teams', name: 'Teams', connected: false },
    { id: 'onedrive', name: 'OneDrive', connected: false },
    { id: 'onenote', name: 'OneNote', connected: false }
  ]);

  const user = accounts[0];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--ms-gray-20)' }}>
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="ms-acrylic border-b"
        style={{ borderColor: 'var(--ms-gray-40)' }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 rounded-sm hover:bg-white/50 transition-colors"
              style={{ color: 'var(--ms-gray-110)' }}
            >
              <Settings size={20} />
            </motion.button>
            <div>
              <h1 className="ms-font-4xl font-semibold" style={{ color: 'var(--ms-gray-130)' }}>
                Microsoft 365
              </h1>
              <p className="ms-font-sm" style={{ color: 'var(--ms-gray-90)' }}>
                Welcome back, {user?.name}
              </p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                style={{ color: 'var(--ms-gray-80)' }}
              />
              <input
                type="text"
                placeholder="Search across your apps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-sm focus:outline-none focus:ring-2 ms-font-sm"
                style={{ 
                  borderColor: 'var(--ms-gray-60)',
                  backgroundColor: 'white',
                  color: 'var(--ms-gray-110)'
                }}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-sm hover:bg-white/50 transition-colors relative"
              style={{ color: 'var(--ms-gray-110)' }}
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full text-xs flex items-center justify-center text-white"
                    style={{ backgroundColor: 'var(--ms-red)', fontSize: '10px' }}>
                3
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowActivity(!showActivity)}
              className="p-2 rounded-sm hover:bg-white/50 transition-colors"
              style={{ color: 'var(--ms-gray-110)' }}
            >
              <Activity size={20} />
            </motion.button>
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white ms-font-sm font-medium"
              style={{ backgroundColor: 'var(--ms-blue)' }}
            >
              {user?.name?.charAt(0)}
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Left Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <Sidebar 
              connectedApps={connectedApps}
              setConnectedApps={setConnectedApps}
              onClose={() => setShowSidebar(false)}
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="ms-font-3xl font-semibold mb-2" style={{ color: 'var(--ms-gray-130)' }}>
                    Your apps
                  </h2>
                  <p className="ms-font-base" style={{ color: 'var(--ms-gray-90)' }}>
                    Access and manage your Microsoft 365 applications
                  </p>
                </div>
                
                {/* Quick Stats */}
                <div className="flex space-x-6">
                  <div className="text-center">
                    <div className="ms-font-2xl font-semibold" style={{ color: 'var(--ms-blue)' }}>
                      {connectedApps.filter(app => app.connected).length}
                    </div>
                    <div className="ms-font-xs" style={{ color: 'var(--ms-gray-80)' }}>
                      Connected
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="ms-font-2xl font-semibold" style={{ color: 'var(--ms-green)' }}>
                      12
                    </div>
                    <div className="ms-font-xs" style={{ color: 'var(--ms-gray-80)' }}>
                      Active today
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="ms-font-2xl font-semibold" style={{ color: 'var(--ms-orange)' }}>
                      5
                    </div>
                    <div className="ms-font-xs" style={{ color: 'var(--ms-gray-80)' }}>
                      Notifications
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <AppGrid connectedApps={connectedApps} searchQuery={searchQuery} />
          </div>
        </main>

        {/* Right Activity Panel */}
        <AnimatePresence>
          {showActivity && (
            <ActivityPanel onClose={() => setShowActivity(false)} />
          )}
        </AnimatePresence>
      </div>

      {/* AI Assistant Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowAI(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-depth-16 flex items-center justify-center text-white hover:shadow-depth-64 transition-all"
        style={{ backgroundColor: 'var(--ms-purple)' }}
      >
        <Zap size={24} />
      </motion.button>

      {/* AI Prompt Modal */}
      <AnimatePresence>
        {showAI && (
          <AIPrompt onClose={() => setShowAI(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;