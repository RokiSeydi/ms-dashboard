import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Plus, Activity, Zap, MessageSquare } from "lucide-react";
import AppGrid from "./AppGrid";
import Sidebar from "./Sidebar";
import ActivityPanel from "./ActivityPanel";
import AIPrompt from "./AIPrompt";

function Dashboard() {
  const { accounts } = useMsal();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showAI, setShowAI] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            >
              <Settings size={20} />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Mindful Workspace
              </h1>
              <p className="text-gray-600 text-sm">Welcome back, {user?.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowActivity(!showActivity)}
              className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
            >
              <Activity size={20} />
            </motion.button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
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
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Microsoft 365 Apps</h2>
              <p className="text-gray-600">Click on any app to see recent activity and quick actions</p>
            </motion.div>

            <AppGrid connectedApps={connectedApps} />
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
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow"
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