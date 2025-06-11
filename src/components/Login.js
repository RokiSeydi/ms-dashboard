import React from "react";
import { useMsal } from "@azure/msal-react";
import { motion } from "framer-motion";
import { Zap, Shield, Users, Calendar, Mail, FileText } from "lucide-react";

function Login() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance
      .loginPopup({ 
        scopes: ["user.read", "mail.read", "calendars.read", "files.read"] 
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Zap className="text-white" size={32} />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Mindful Workspace
          </h1>
          <p className="text-gray-600">
            Bring clarity to your Microsoft 365 experience
          </p>
        </div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
        >
          <h3 className="font-semibold text-gray-800 mb-4">What you'll get:</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail size={16} className="text-blue-600" />
              </div>
              <span className="text-sm text-gray-700">Unified view of all your apps</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar size={16} className="text-green-600" />
              </div>
              <span className="text-sm text-gray-700">Recent activity at a glance</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-purple-600" />
              </div>
              <span className="text-sm text-gray-700">AI-powered cross-app commands</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Shield size={16} className="text-orange-600" />
              </div>
              <span className="text-sm text-gray-700">Secure Microsoft integration</span>
            </div>
          </div>
        </motion.div>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Connect with Microsoft 365
        </motion.button>

        <p className="text-center text-xs text-gray-500 mt-4">
          We'll securely connect to your Microsoft account to provide a unified workspace experience.
        </p>
      </motion.div>
    </div>
  );
}

export default Login;