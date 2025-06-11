import React from "react";
import { useMsal } from "@azure/msal-react";
import { motion } from "framer-motion";
import { Shield, Users, Calendar, Mail, FileText, Zap, CheckCircle } from "lucide-react";

function Login() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance
      .loginPopup({ 
        scopes: ["user.read", "mail.read", "calendars.read", "files.read"] 
      })
      .catch((e) => console.error(e));
  };

  const features = [
    {
      icon: Mail,
      title: "Unified inbox",
      description: "See all your emails and messages in one place"
    },
    {
      icon: Calendar,
      title: "Smart scheduling",
      description: "AI-powered calendar management and meeting insights"
    },
    {
      icon: FileText,
      title: "Document hub",
      description: "Access and collaborate on all your files seamlessly"
    },
    {
      icon: Zap,
      title: "Cross-app automation",
      description: "Perform actions across multiple apps with AI commands"
    }
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--ms-gray-20)' }}>
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ backgroundColor: 'var(--ms-blue)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <div className="w-16 h-16 bg-white/20 rounded-sm flex items-center justify-center mb-6">
                <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
                </div>
              </div>
              <h1 className="ms-font-6xl font-light mb-4">
                Microsoft 365
              </h1>
              <p className="ms-font-xl text-blue-100 mb-8">
                Your intelligent workspace that brings together the apps and services you use every day.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-sm flex items-center justify-center flex-shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="ms-font-lg font-medium mb-1">{feature.title}</h3>
                      <p className="ms-font-sm text-blue-100">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Login */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-sm flex items-center justify-center" style={{ backgroundColor: 'var(--ms-blue)' }}>
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: 'var(--ms-blue)' }}></div>
              </div>
            </div>
            <h1 className="ms-font-4xl font-light" style={{ color: 'var(--ms-gray-130)' }}>
              Microsoft 365
            </h1>
          </div>

          {/* Sign In Card */}
          <div className="bg-white rounded-sm shadow-depth-8 p-8" style={{ border: `1px solid var(--ms-gray-40)` }}>
            <div className="text-center mb-8">
              <h2 className="ms-font-3xl font-light mb-2" style={{ color: 'var(--ms-gray-130)' }}>
                Sign in
              </h2>
              <p className="ms-font-base" style={{ color: 'var(--ms-gray-80)' }}>
                to continue to Microsoft 365
              </p>
            </div>

            {/* Benefits */}
            <div className="mb-8 space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle size={16} style={{ color: 'var(--ms-green)' }} />
                <span className="ms-font-sm" style={{ color: 'var(--ms-gray-90)' }}>
                  Secure access to all your apps
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle size={16} style={{ color: 'var(--ms-green)' }} />
                <span className="ms-font-sm" style={{ color: 'var(--ms-gray-90)' }}>
                  Unified activity and notifications
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle size={16} style={{ color: 'var(--ms-green)' }} />
                <span className="ms-font-sm" style={{ color: 'var(--ms-gray-90)' }}>
                  AI-powered cross-app commands
                </span>
              </div>
            </div>

            {/* Sign In Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              className="w-full py-3 px-6 rounded-sm ms-font-base font-medium text-white transition-all shadow-depth-4 hover:shadow-depth-8"
              style={{ backgroundColor: 'var(--ms-blue)' }}
            >
              Sign in with Microsoft
            </motion.button>

            <div className="mt-6 text-center">
              <p className="ms-font-xs" style={{ color: 'var(--ms-gray-70)' }}>
                By signing in, you agree to our{' '}
                <a href="#" className="hover:underline" style={{ color: 'var(--ms-blue)' }}>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="hover:underline" style={{ color: 'var(--ms-blue)' }}>
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>

          {/* Help Links */}
          <div className="mt-8 text-center space-y-2">
            <a href="#" className="block ms-font-sm hover:underline" style={{ color: 'var(--ms-blue)' }}>
              Can't access your account?
            </a>
            <a href="#" className="block ms-font-sm hover:underline" style={{ color: 'var(--ms-blue)' }}>
              Sign-in options
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;