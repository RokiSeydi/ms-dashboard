import React from "react";
import { motion } from "framer-motion";
import { X, Clock, Mail, Calendar, FileText, Users, Activity } from "lucide-react";

const mockActivities = [
  {
    id: 1,
    type: "email",
    title: "Meeting follow-up from Sarah",
    description: "Quarterly review discussion points",
    time: "2 minutes ago",
    icon: Mail,
    color: "blue"
  },
  {
    id: 2,
    type: "calendar",
    title: "Team standup starting soon",
    description: "Daily sync with development team",
    time: "In 28 minutes",
    icon: Calendar,
    color: "green"
  },
  {
    id: 3,
    type: "document",
    title: "Project proposal updated",
    description: "Budget section revised by John",
    time: "1 hour ago",
    icon: FileText,
    color: "purple"
  },
  {
    id: 4,
    type: "teams",
    title: "New message in Marketing",
    description: "Campaign launch timeline discussion",
    time: "2 hours ago",
    icon: Users,
    color: "orange"
  },
  {
    id: 5,
    type: "email",
    title: "Client feedback received",
    description: "Positive response on latest deliverable",
    time: "3 hours ago",
    icon: Mail,
    color: "blue"
  }
];

const colorClasses = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600"
};

function ActivityPanel({ onClose }) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Activity size={20} className="mr-2 text-green-600" />
          Recent Activity
        </h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </motion.button>
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
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[activity.color]}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800 text-sm truncate">
                    {activity.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Clock size={12} className="mr-1" />
                    {activity.time}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-100 mt-4">
        <h3 className="font-medium text-gray-800 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
          >
            Compose new email
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm"
          >
            Schedule meeting
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm"
          >
            Create document
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ActivityPanel;