import React from "react";
import { motion } from "framer-motion";
import { X, Plus, Settings, Palette, Bell, Shield, HelpCircle, User, Lock, Globe } from "lucide-react";

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
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -320, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed left-0 top-0 h-full w-80 bg-white shadow-depth-64 z-50 overflow-y-auto"
      style={{ borderRight: `1px solid var(--ms-gray-40)` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6" style={{ borderBottom: `1px solid var(--ms-gray-30)` }}>
        <h2 className="ms-font-2xl font-semibold" style={{ color: 'var(--ms-gray-130)' }}>
          Settings
        </h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 rounded-sm hover:bg-gray-100 transition-colors"
        >
          <X size={20} style={{ color: 'var(--ms-gray-80)' }} />
        </motion.button>
      </div>

      {/* Connected Apps Section */}
      <div className="p-6" style={{ borderBottom: `1px solid var(--ms-gray-30)` }}>
        <h3 className="ms-font-lg font-medium mb-4 flex items-center" style={{ color: 'var(--ms-gray-130)' }}>
          <Shield size={18} className="mr-2" style={{ color: 'var(--ms-green)' }} />
          Connected Apps
        </h3>
        <div className="space-y-3">
          {connectedApps.filter(app => app.connected).map(app => (
            <div key={app.id} className="flex items-center justify-between p-3 rounded-sm" style={{ backgroundColor: 'var(--ms-gray-20)' }}>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--ms-green)' }}></div>
                <span className="ms-font-sm font-medium" style={{ color: 'var(--ms-gray-110)' }}>
                  {app.name}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDisconnectApp(app.id)}
                className="ms-font-xs px-3 py-1 rounded-sm transition-colors"
                style={{ 
                  backgroundColor: 'var(--ms-red)',
                  color: 'white'
                }}
              >
                Disconnect
              </motion.button>
            </div>
          ))}
        </div>
      </div>

      {/* Available Apps Section */}
      {disconnectedApps.length > 0 && (
        <div className="p-6" style={{ borderBottom: `1px solid var(--ms-gray-30)` }}>
          <h3 className="ms-font-lg font-medium mb-4 flex items-center" style={{ color: 'var(--ms-gray-130)' }}>
            <Plus size={18} className="mr-2" style={{ color: 'var(--ms-blue)' }} />
            Available Apps
          </h3>
          <div className="space-y-3">
            {disconnectedApps.map(app => (
              <div key={app.id} className="flex items-center justify-between p-3 rounded-sm" style={{ backgroundColor: 'var(--ms-gray-20)' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--ms-gray-60)' }}></div>
                  <span className="ms-font-sm font-medium" style={{ color: 'var(--ms-gray-110)' }}>
                    {app.name}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleConnectApp(app.id)}
                  className="ms-font-xs px-3 py-1 rounded-sm transition-colors"
                  style={{ 
                    backgroundColor: 'var(--ms-blue)',
                    color: 'white'
                  }}
                >
                  Connect
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preferences Section */}
      <div className="p-6" style={{ borderBottom: `1px solid var(--ms-gray-30)` }}>
        <h3 className="ms-font-lg font-medium mb-4 flex items-center" style={{ color: 'var(--ms-gray-130)' }}>
          <Settings size={18} className="mr-2" style={{ color: 'var(--ms-gray-80)' }} />
          Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="ms-font-sm" style={{ color: 'var(--ms-gray-110)' }}>Notifications</span>
            <div className="w-10 h-6 rounded-full relative cursor-pointer" style={{ backgroundColor: 'var(--ms-blue)' }}>
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform shadow-depth-4"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="ms-font-sm" style={{ color: 'var(--ms-gray-110)' }}>Auto-refresh</span>
            <div className="w-10 h-6 rounded-full relative cursor-pointer" style={{ backgroundColor: 'var(--ms-blue)' }}>
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform shadow-depth-4"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="ms-font-sm" style={{ color: 'var(--ms-gray-110)' }}>Compact view</span>
            <div className="w-10 h-6 rounded-full relative cursor-pointer" style={{ backgroundColor: 'var(--ms-gray-50)' }}>
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform shadow-depth-4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div className="p-6" style={{ borderBottom: `1px solid var(--ms-gray-30)` }}>
        <h3 className="ms-font-lg font-medium mb-4 flex items-center" style={{ color: 'var(--ms-gray-130)' }}>
          <User size={18} className="mr-2" style={{ color: 'var(--ms-gray-80)' }} />
          Account
        </h3>
        <div className="space-y-3">
          <button className="w-full text-left ms-font-sm p-2 rounded-sm hover:bg-gray-50 transition-colors flex items-center" style={{ color: 'var(--ms-gray-110)' }}>
            <Lock size={16} className="mr-3" style={{ color: 'var(--ms-gray-70)' }} />
            Privacy & Security
          </button>
          <button className="w-full text-left ms-font-sm p-2 rounded-sm hover:bg-gray-50 transition-colors flex items-center" style={{ color: 'var(--ms-gray-110)' }}>
            <Globe size={16} className="mr-3" style={{ color: 'var(--ms-gray-70)' }} />
            Language & Region
          </button>
          <button className="w-full text-left ms-font-sm p-2 rounded-sm hover:bg-gray-50 transition-colors flex items-center" style={{ color: 'var(--ms-gray-110)' }}>
            <Bell size={16} className="mr-3" style={{ color: 'var(--ms-gray-70)' }} />
            Notification Settings
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div className="p-6">
        <h3 className="ms-font-lg font-medium mb-4 flex items-center" style={{ color: 'var(--ms-gray-130)' }}>
          <HelpCircle size={18} className="mr-2" style={{ color: 'var(--ms-gray-80)' }} />
          Help & Support
        </h3>
        <div className="space-y-3">
          <button className="w-full text-left ms-font-sm hover:underline transition-colors" style={{ color: 'var(--ms-blue)' }}>
            Getting Started Guide
          </button>
          <button className="w-full text-left ms-font-sm hover:underline transition-colors" style={{ color: 'var(--ms-blue)' }}>
            Keyboard Shortcuts
          </button>
          <button className="w-full text-left ms-font-sm hover:underline transition-colors" style={{ color: 'var(--ms-blue)' }}>
            Contact Support
          </button>
          <button className="w-full text-left ms-font-sm hover:underline transition-colors" style={{ color: 'var(--ms-blue)' }}>
            What's New
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;