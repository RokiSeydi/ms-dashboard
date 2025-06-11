import React from "react";
import { motion } from "framer-motion";
import { X, Clock, Mail, Calendar, FileText, Users, Activity, Filter, MoreVertical } from "lucide-react";

const mockActivities = [
  {
    id: 1,
    type: "email",
    title: "Meeting follow-up from Sarah",
    description: "Quarterly review discussion points and action items",
    time: "2 minutes ago",
    icon: Mail,
    priority: "high",
    app: "Outlook"
  },
  {
    id: 2,
    type: "calendar",
    title: "Team standup starting soon",
    description: "Daily sync with development team",
    time: "In 28 minutes",
    icon: Calendar,
    priority: "high",
    app: "Calendar"
  },
  {
    id: 3,
    type: "document",
    title: "Project proposal updated",
    description: "Budget section revised by John",
    time: "1 hour ago",
    icon: FileText,
    priority: "normal",
    app: "Word"
  },
  {
    id: 4,
    type: "teams",
    title: "New message in Marketing",
    description: "Campaign launch timeline discussion",
    time: "2 hours ago",
    icon: Users,
    priority: "normal",
    app: "Teams"
  },
  {
    id: 5,
    type: "email",
    title: "Client feedback received",
    description: "Positive response on latest deliverable",
    time: "3 hours ago",
    icon: Mail,
    priority: "low",
    app: "Outlook"
  }
];

const priorityColors = {
  high: 'var(--ms-red)',
  normal: 'var(--ms-blue)',
  low: 'var(--ms-gray-60)'
};

function ActivityPanel({ onClose }) {
  return (
    <motion.div
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 320, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 h-full w-80 bg-white shadow-depth-64 z-50 overflow-y-auto"
      style={{ borderLeft: `1px solid var(--ms-gray-40)` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6" style={{ borderBottom: `1px solid var(--ms-gray-30)` }}>
        <div>
          <h2 className="ms-font-2xl font-semibold flex items-center" style={{ color: 'var(--ms-gray-130)' }}>
            <Activity size={20} className="mr-2" style={{ color: 'var(--ms-green)' }} />
            Activity
          </h2>
          <p className="ms-font-sm" style={{ color: 'var(--ms-gray-80)' }}>
            Recent updates across your apps
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 rounded-sm hover:bg-gray-100 transition-colors"
        >
          <X size={20} style={{ color: 'var(--ms-gray-80)' }} />
        </motion.button>
      </div>

      {/* Filter Bar */}
      <div className="p-4" style={{ borderBottom: `1px solid var(--ms-gray-30)` }}>
        <div className="flex items-center justify-between">
          <button className="flex items-center space-x-2 px-3 py-2 rounded-sm hover:bg-gray-50 transition-colors">
            <Filter size={16} style={{ color: 'var(--ms-gray-80)' }} />
            <span className="ms-font-sm" style={{ color: 'var(--ms-gray-110)' }}>All apps</span>
          </button>
          <button className="p-2 rounded-sm hover:bg-gray-50 transition-colors">
            <MoreVertical size={16} style={{ color: 'var(--ms-gray-80)' }} />
          </button>
        </div>
      </div>

      {/* Activity List */}
      <div className="p-4 space-y-4">
        {mockActivities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-sm hover:bg-gray-50 transition-colors cursor-pointer border"
              style={{ 
                backgroundColor: 'var(--ms-gray-10)',
                borderColor: 'var(--ms-gray-30)'
              }}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0" style={{ backgroundColor: priorityColors[activity.priority] }}>
                  <Icon size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="ms-font-sm font-medium line-clamp-1" style={{ color: 'var(--ms-gray-130)' }}>
                      {activity.title}
                    </h4>
                    <span className="ms-font-xs px-2 py-1 rounded-sm" style={{ 
                      backgroundColor: 'var(--ms-gray-30)',
                      color: 'var(--ms-gray-80)'
                    }}>
                      {activity.app}
                    </span>
                  </div>
                  <p className="ms-font-xs line-clamp-2 mb-2" style={{ color: 'var(--ms-gray-80)' }}>
                    {activity.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center ms-font-xs" style={{ color: 'var(--ms-gray-70)' }}>
                      <Clock size={12} className="mr-1" />
                      {activity.time}
                    </div>
                    {activity.priority === 'high' && (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--ms-red)' }}></div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="p-4 mt-4" style={{ borderTop: `1px solid var(--ms-gray-30)` }}>
        <h3 className="ms-font-base font-medium mb-3" style={{ color: 'var(--ms-gray-130)' }}>
          Quick Actions
        </h3>
        <div className="space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left p-3 rounded-sm transition-colors ms-font-sm"
            style={{ 
              backgroundColor: 'var(--ms-blue-light)',
              color: 'var(--ms-blue)'
            }}
          >
            Compose new email
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left p-3 rounded-sm transition-colors ms-font-sm"
            style={{ 
              backgroundColor: 'var(--ms-gray-20)',
              color: 'var(--ms-green)'
            }}
          >
            Schedule meeting
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left p-3 rounded-sm transition-colors ms-font-sm"
            style={{ 
              backgroundColor: 'var(--ms-gray-20)',
              color: 'var(--ms-purple)'
            }}
          >
            Create document
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default ActivityPanel;