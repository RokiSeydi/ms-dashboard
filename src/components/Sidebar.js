import React from "react";
import { motion } from "framer-motion";
import { X, Plus, Settings, Palette, Bell, Shield, HelpCircle } from "lucide-react";

function Sidebar({ connectedApps, setConnectedApps, onClose }) {
  const disconnectedApps = connectedApps.filter(app => !app.connected);
  
  const handleConnectApp = (appId) => {
    setConnectedApps(prev => 
      prev.map(app => 
        app.id === appId ? { ...app, connected: true } : app
      )
    );
  };

  const handleDisconnectApp = (appId) => {
    setConnectedApps(prev => 
      prev.map(app => 
        app.id === appId ? { ...app, connected: false } : app
      )
    );
  };

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </motion.button>
      </div>

      {/* Connected Apps Section */}
      <div className="p-6 border-b border-gray-100">
        <h3 className="font-medium text-gray-800 mb-4 flex items-center">
          <Shield size={18} className="mr-2 text-green-600" />
          Connected Apps
        </h3>
        <div className="space-y-3">
          {connectedApps.filter(app => app.connected).map(app => (
            <div key={app.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">{app.name}</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDisconnectApp(app.id)}
                className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
              >
                Disconnect
              </motion.button>
            </div>
          ))}
        </div>
      </div>

      {/* Available Apps Section */}
      {disconnectedApps.length > 0 && (
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-medium text-gray-800 mb-4 flex items-center">
            <Plus size={18} className="mr-2 text-blue-600" />
            Available Apps
          </h3>
          <div className="space-y-3">
            {disconnectedApps.map(app => (
              <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{app.name}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleConnectApp(app.id)}
                  className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                >
                  Connect
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preferences Section */}
      <div className="p-6 border-b border-gray-100">
        <h3 className="font-medium text-gray-800 mb-4 flex items-center">
          <Settings size={18} className="mr-2 text-gray-600" />
          Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Dark Mode</span>
            <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Notifications</span>
            <div className="w-10 h-6 bg-blue-500 rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Auto-refresh</span>
            <div className="w-10 h-6 bg-blue-500 rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Section */}
      <div className="p-6 border-b border-gray-100">
        <h3 className="font-medium text-gray-800 mb-4 flex items-center">
          <Palette size={18} className="mr-2 text-purple-600" />
          Theme
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="w-full h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg cursor-pointer border-2 border-blue-500"></div>
          <div className="w-full h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg cursor-pointer border-2 border-transparent hover:border-gray-300"></div>
          <div className="w-full h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-lg cursor-pointer border-2 border-transparent hover:border-gray-300"></div>
        </div>
      </div>

      {/* Help Section */}
      <div className="p-6">
        <h3 className="font-medium text-gray-800 mb-4 flex items-center">
          <HelpCircle size={18} className="mr-2 text-orange-600" />
          Help & Support
        </h3>
        <div className="space-y-3">
          <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 transition-colors">
            Getting Started Guide
          </button>
          <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 transition-colors">
            Keyboard Shortcuts
          </button>
          <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 transition-colors">
            Contact Support
          </button>
          <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 transition-colors">
            Privacy Policy
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;