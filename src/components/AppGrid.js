import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Calendar, 
  FileText, 
  BarChart3, 
  Presentation, 
  Users, 
  Cloud, 
  BookOpen,
  ExternalLink,
  Clock,
  CheckCircle
} from "lucide-react";

const appIcons = {
  outlook: Mail,
  calendar: Calendar,
  word: FileText,
  excel: BarChart3,
  powerpoint: Presentation,
  teams: Users,
  onedrive: Cloud,
  onenote: BookOpen
};

const appColors = {
  outlook: "from-blue-500 to-blue-600",
  calendar: "from-green-500 to-green-600",
  word: "from-blue-600 to-blue-700",
  excel: "from-green-600 to-green-700",
  powerpoint: "from-orange-500 to-red-500",
  teams: "from-purple-500 to-purple-600",
  onedrive: "from-blue-400 to-blue-500",
  onenote: "from-purple-600 to-purple-700"
};

const mockData = {
  outlook: {
    recentActivity: [
      { type: "email", title: "Meeting follow-up", time: "2 hours ago" },
      { type: "email", title: "Project update", time: "4 hours ago" },
      { type: "email", title: "Weekly report", time: "1 day ago" }
    ],
    stats: { unread: 12, total: 156 }
  },
  calendar: {
    recentActivity: [
      { type: "meeting", title: "Team standup", time: "In 30 minutes" },
      { type: "meeting", title: "Client presentation", time: "Tomorrow 2 PM" },
      { type: "meeting", title: "Project review", time: "Friday 10 AM" }
    ],
    stats: { today: 3, thisWeek: 12 }
  },
  word: {
    recentActivity: [
      { type: "document", title: "Project proposal.docx", time: "Yesterday" },
      { type: "document", title: "Meeting notes.docx", time: "2 days ago" }
    ],
    stats: { recent: 5, shared: 2 }
  },
  excel: {
    recentActivity: [
      { type: "spreadsheet", title: "Budget 2024.xlsx", time: "3 hours ago" },
      { type: "spreadsheet", title: "Sales data.xlsx", time: "1 day ago" }
    ],
    stats: { recent: 8, shared: 3 }
  },
  powerpoint: {
    recentActivity: [
      { type: "presentation", title: "Q4 Results.pptx", time: "Yesterday" },
      { type: "presentation", title: "Product demo.pptx", time: "3 days ago" }
    ],
    stats: { recent: 4, shared: 1 }
  },
  teams: {
    recentActivity: [
      { type: "chat", title: "Marketing team", time: "5 minutes ago" },
      { type: "meeting", title: "All hands meeting", time: "1 hour ago" }
    ],
    stats: { unread: 7, teams: 5 }
  },
  onedrive: {
    recentActivity: [
      { type: "file", title: "Presentation.pptx", time: "2 hours ago" },
      { type: "folder", title: "Project files", time: "1 day ago" }
    ],
    stats: { files: 234, storage: "15 GB used" }
  },
  onenote: {
    recentActivity: [
      { type: "note", title: "Meeting notes", time: "1 hour ago" },
      { type: "note", title: "Ideas brainstorm", time: "Yesterday" }
    ],
    stats: { notebooks: 6, pages: 45 }
  }
};

function AppGrid({ connectedApps }) {
  const [selectedApp, setSelectedApp] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const handleAppClick = (app) => {
    if (app.connected) {
      setSelectedApp(selectedApp?.id === app.id ? null : app);
    }
  };

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex justify-end">
        <div className="bg-white rounded-lg p-1 shadow-sm border">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              viewMode === "grid" 
                ? "bg-blue-100 text-blue-600" 
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              viewMode === "list" 
                ? "bg-blue-100 text-blue-600" 
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Apps Grid/List */}
      <div className={
        viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
      }>
        {connectedApps.map((app) => {
          const Icon = appIcons[app.id];
          const isSelected = selectedApp?.id === app.id;
          
          return (
            <motion.div
              key={app.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              className={`
                relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer
                ${viewMode === "list" ? "flex items-center p-4" : "p-6"}
                ${isSelected ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"}
                ${!app.connected ? "opacity-60" : ""}
                transition-all duration-200
              `}
              onClick={() => handleAppClick(app)}
            >
              {/* Connection Status Indicator */}
              <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${
                app.connected ? "bg-green-400" : "bg-gray-300"
              }`} />

              <div className={viewMode === "list" ? "flex items-center space-x-4 flex-1" : ""}>
                {/* App Icon */}
                <div className={`
                  ${viewMode === "list" ? "w-12 h-12" : "w-16 h-16 mb-4"}
                  bg-gradient-to-br ${appColors[app.id]} rounded-lg flex items-center justify-center
                `}>
                  <Icon className="text-white" size={viewMode === "list" ? 24 : 32} />
                </div>

                {/* App Info */}
                <div className={viewMode === "list" ? "flex-1" : ""}>
                  <h3 className="font-semibold text-gray-800 mb-1">{app.name}</h3>
                  <p className="text-sm text-gray-600">
                    {app.connected ? "Connected" : "Not connected"}
                  </p>
                  
                  {app.connected && mockData[app.id] && (
                    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                      {Object.entries(mockData[app.id].stats).map(([key, value]) => (
                        <span key={key} className="flex items-center space-x-1">
                          <span className="capitalize">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {viewMode === "list" && app.connected && (
                  <ExternalLink size={16} className="text-gray-400" />
                )}
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isSelected && app.connected && mockData[app.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-100"
                  >
                    <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                      <Clock size={16} className="mr-2" />
                      Recent Activity
                    </h4>
                    <div className="space-y-2">
                      {mockData[app.id].recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700 truncate flex-1">{activity.title}</span>
                          <span className="text-gray-500 text-xs ml-2">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-3 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-colors"
                    >
                      Open {app.name}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Connection Prompt for Disconnected Apps */}
      {connectedApps.some(app => !app.connected) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200"
        >
          <h3 className="font-semibold text-gray-800 mb-2">Connect More Apps</h3>
          <p className="text-gray-600 mb-4">
            Connect additional Microsoft 365 apps to get a complete view of your workspace.
          </p>
          <div className="flex flex-wrap gap-2">
            {connectedApps.filter(app => !app.connected).map(app => (
              <span key={app.id} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border">
                {app.name}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default AppGrid;