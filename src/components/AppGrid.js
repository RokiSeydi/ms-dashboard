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
  CheckCircle,
  Grid3X3,
  List,
  MoreHorizontal,
  Star,
  TrendingUp
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
  outlook: 'var(--ms-blue)',
  calendar: 'var(--ms-green)',
  word: 'var(--ms-blue)',
  excel: 'var(--ms-green)',
  powerpoint: 'var(--ms-orange)',
  teams: 'var(--ms-purple)',
  onedrive: 'var(--ms-blue)',
  onenote: 'var(--ms-purple)'
};

const mockData = {
  outlook: {
    recentActivity: [
      { type: "email", title: "Meeting follow-up", time: "2 hours ago", priority: "high" },
      { type: "email", title: "Project update", time: "4 hours ago", priority: "normal" },
      { type: "email", title: "Weekly report", time: "1 day ago", priority: "low" }
    ],
    stats: { unread: 12, total: 156, today: 8 }
  },
  calendar: {
    recentActivity: [
      { type: "meeting", title: "Team standup", time: "In 30 minutes", priority: "high" },
      { type: "meeting", title: "Client presentation", time: "Tomorrow 2 PM", priority: "high" },
      { type: "meeting", title: "Project review", time: "Friday 10 AM", priority: "normal" }
    ],
    stats: { today: 3, thisWeek: 12, upcoming: 5 }
  },
  word: {
    recentActivity: [
      { type: "document", title: "Project proposal.docx", time: "Yesterday", priority: "normal" },
      { type: "document", title: "Meeting notes.docx", time: "2 days ago", priority: "low" }
    ],
    stats: { recent: 5, shared: 2, drafts: 3 }
  },
  excel: {
    recentActivity: [
      { type: "spreadsheet", title: "Budget 2024.xlsx", time: "3 hours ago", priority: "high" },
      { type: "spreadsheet", title: "Sales data.xlsx", time: "1 day ago", priority: "normal" }
    ],
    stats: { recent: 8, shared: 3, formulas: 45 }
  },
  powerpoint: {
    recentActivity: [
      { type: "presentation", title: "Q4 Results.pptx", time: "Yesterday", priority: "high" },
      { type: "presentation", title: "Product demo.pptx", time: "3 days ago", priority: "normal" }
    ],
    stats: { recent: 4, shared: 1, slides: 67 }
  },
  teams: {
    recentActivity: [
      { type: "chat", title: "Marketing team", time: "5 minutes ago", priority: "normal" },
      { type: "meeting", title: "All hands meeting", time: "1 hour ago", priority: "high" }
    ],
    stats: { unread: 7, teams: 5, calls: 12 }
  },
  onedrive: {
    recentActivity: [
      { type: "file", title: "Presentation.pptx", time: "2 hours ago", priority: "normal" },
      { type: "folder", title: "Project files", time: "1 day ago", priority: "low" }
    ],
    stats: { files: 234, storage: "15 GB", synced: 98 }
  },
  onenote: {
    recentActivity: [
      { type: "note", title: "Meeting notes", time: "1 hour ago", priority: "normal" },
      { type: "note", title: "Ideas brainstorm", time: "Yesterday", priority: "low" }
    ],
    stats: { notebooks: 6, pages: 45, sections: 23 }
  }
};

function AppGrid({ connectedApps, searchQuery = "" }) {
  const [selectedApp, setSelectedApp] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [favoriteApps, setFavoriteApps] = useState(['outlook', 'calendar']);

  const filteredApps = connectedApps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAppClick = (app) => {
    if (app.connected) {
      setSelectedApp(selectedApp?.id === app.id ? null : app);
    }
  };

  const toggleFavorite = (appId) => {
    setFavoriteApps(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  return (
    <div className="space-y-6">
      {/* View Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 p-1 rounded-sm" style={{ backgroundColor: 'var(--ms-gray-30)' }}>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-sm transition-colors ms-font-sm ${
                viewMode === "grid" 
                  ? "bg-white shadow-depth-4" 
                  : "hover:bg-white/50"
              }`}
              style={{ color: 'var(--ms-gray-110)' }}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-sm transition-colors ms-font-sm ${
                viewMode === "list" 
                  ? "bg-white shadow-depth-4" 
                  : "hover:bg-white/50"
              }`}
              style={{ color: 'var(--ms-gray-110)' }}
            >
              <List size={16} />
            </button>
          </div>
          
          {searchQuery && (
            <div className="ms-font-sm" style={{ color: 'var(--ms-gray-80)' }}>
              {filteredApps.length} result{filteredApps.length !== 1 ? 's' : ''} for "{searchQuery}"
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span className="ms-font-sm" style={{ color: 'var(--ms-gray-80)' }}>
            {connectedApps.filter(app => app.connected).length} of {connectedApps.length} connected
          </span>
        </div>
      </div>

      {/* Apps Grid/List */}
      <div className={
        viewMode === "grid" 
          ? "ms-grid ms-grid-cols-1 ms-grid-sm-2 ms-grid-md-3 ms-grid-lg-4 ms-grid-xl-5"
          : "space-y-3"
      }>
        {filteredApps.map((app, index) => {
          const Icon = appIcons[app.id];
          const isSelected = selectedApp?.id === app.id;
          const isFavorite = favoriteApps.includes(app.id);
          const appData = mockData[app.id];
          
          return (
            <motion.div
              key={app.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              className={`
                relative bg-white border rounded-sm overflow-hidden cursor-pointer transition-all duration-200
                ${viewMode === "list" ? "flex items-center p-4" : "p-6"}
                ${isSelected ? "shadow-depth-16" : "shadow-depth-4 hover:shadow-depth-8"}
                ${!app.connected ? "opacity-60" : ""}
              `}
              style={{ 
                borderColor: isSelected ? appColors[app.id] : 'var(--ms-gray-40)',
                borderWidth: isSelected ? '2px' : '1px'
              }}
              onClick={() => handleAppClick(app)}
            >
              {/* Connection Status & Favorite */}
              <div className="absolute top-3 right-3 flex items-center space-x-2">
                {app.connected && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(app.id);
                    }}
                    className="p-1 rounded-sm hover:bg-gray-100 transition-colors"
                  >
                    <Star 
                      size={14} 
                      className={isFavorite ? "fill-current" : ""}
                      style={{ color: isFavorite ? 'var(--ms-orange)' : 'var(--ms-gray-60)' }}
                    />
                  </motion.button>
                )}
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: app.connected ? 'var(--ms-green)' : 'var(--ms-gray-60)' }}
                />
              </div>

              <div className={viewMode === "list" ? "flex items-center space-x-4 flex-1" : ""}>
                {/* App Icon */}
                <div className={`
                  ${viewMode === "list" ? "w-12 h-12" : "w-16 h-16 mb-4"}
                  rounded-sm flex items-center justify-center text-white
                `}
                style={{ backgroundColor: appColors[app.id] }}>
                  <Icon size={viewMode === "list" ? 24 : 32} />
                </div>

                {/* App Info */}
                <div className={viewMode === "list" ? "flex-1" : ""}>
                  <h3 className="ms-font-lg font-semibold mb-1" style={{ color: 'var(--ms-gray-130)' }}>
                    {app.name}
                  </h3>
                  <p className="ms-font-sm mb-2" style={{ color: 'var(--ms-gray-80)' }}>
                    {app.connected ? "Connected and synced" : "Not connected"}
                  </p>
                  
                  {app.connected && appData && (
                    <div className="flex items-center space-x-4 ms-font-xs" style={{ color: 'var(--ms-gray-70)' }}>
                      {Object.entries(appData.stats).slice(0, 2).map(([key, value]) => (
                        <span key={key} className="flex items-center space-x-1">
                          <span className="capitalize">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {viewMode === "list" && app.connected && (
                  <div className="flex items-center space-x-2">
                    <TrendingUp size={16} style={{ color: 'var(--ms-green)' }} />
                    <ExternalLink size={16} style={{ color: 'var(--ms-gray-60)' }} />
                  </div>
                )}
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isSelected && app.connected && appData && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4"
                    style={{ borderTop: `1px solid var(--ms-gray-30)` }}
                  >
                    <h4 className="ms-font-base font-medium mb-3 flex items-center" style={{ color: 'var(--ms-gray-130)' }}>
                      <Clock size={16} className="mr-2" style={{ color: 'var(--ms-gray-80)' }} />
                      Recent Activity
                    </h4>
                    <div className="space-y-3">
                      {appData.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="ms-font-sm font-medium line-clamp-1" style={{ color: 'var(--ms-gray-110)' }}>
                              {activity.title}
                            </div>
                            <div className="ms-font-xs" style={{ color: 'var(--ms-gray-70)' }}>
                              {activity.time}
                            </div>
                          </div>
                          {activity.priority === 'high' && (
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--ms-red)' }}></div>
                          )}
                        </div>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-4 w-full py-2 px-4 rounded-sm ms-font-sm font-medium text-white transition-colors"
                      style={{ backgroundColor: appColors[app.id] }}
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
      {connectedApps.some(app => !app.connected) && !searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-sm p-6 border shadow-depth-4"
          style={{ borderColor: 'var(--ms-gray-40)' }}
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-sm flex items-center justify-center" style={{ backgroundColor: 'var(--ms-blue-light)' }}>
              <ExternalLink size={24} style={{ color: 'var(--ms-blue)' }} />
            </div>
            <div className="flex-1">
              <h3 className="ms-font-lg font-semibold mb-2" style={{ color: 'var(--ms-gray-130)' }}>
                Connect more apps
              </h3>
              <p className="ms-font-sm mb-4" style={{ color: 'var(--ms-gray-80)' }}>
                Get the most out of your Microsoft 365 experience by connecting additional apps.
              </p>
              <div className="flex flex-wrap gap-2">
                {connectedApps.filter(app => !app.connected).map(app => (
                  <span 
                    key={app.id} 
                    className="px-3 py-1 rounded-sm ms-font-xs border"
                    style={{ 
                      backgroundColor: 'var(--ms-gray-20)',
                      borderColor: 'var(--ms-gray-40)',
                      color: 'var(--ms-gray-90)'
                    }}
                  >
                    {app.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default AppGrid;