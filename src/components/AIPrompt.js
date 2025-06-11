import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Zap, MessageSquare, Lightbulb, Bot, User } from "lucide-react";

const suggestedPrompts = [
  "Take the names from my Excel contact list and create a Word document with them in bullet points",
  "Schedule a meeting with everyone who replied to my last email",
  "Summarize all emails from this week and create a PowerPoint slide",
  "Find all documents modified today and organize them in a OneDrive folder",
  "Create a calendar event for next week's project deadline from my task list"
];

function AIPrompt({ onClose }) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    const userMessage = { type: "user", content: prompt, timestamp: new Date() };
    setConversation(prev => [...prev, userMessage]);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = {
        type: "ai",
        content: `I understand you want to: "${prompt}". This would involve connecting to your Microsoft 365 apps and performing cross-app operations. In a full implementation, I would:

1. Access the relevant Microsoft Graph APIs
2. Retrieve the necessary data from your apps
3. Process and transform the information
4. Execute the requested actions across your Microsoft 365 suite

This is a powerful feature that would require proper authentication and permissions to access your Microsoft 365 data.`,
        timestamp: new Date()
      };
      setConversation(prev => [...prev, aiResponse]);
      setIsLoading(false);
      setPrompt("");
    }, 2000);
  };

  const handleSuggestedPrompt = (suggestedPrompt) => {
    setPrompt(suggestedPrompt);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-sm shadow-depth-64 w-full max-w-2xl max-h-[80vh] overflow-hidden"
        style={{ border: `1px solid var(--ms-gray-40)` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6" style={{ 
          borderBottom: `1px solid var(--ms-gray-30)`,
          backgroundColor: 'var(--ms-gray-10)'
        }}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: 'var(--ms-purple)' }}>
              <Zap className="text-white" size={20} />
            </div>
            <div>
              <h2 className="ms-font-xl font-semibold" style={{ color: 'var(--ms-gray-130)' }}>
                AI Assistant
              </h2>
              <p className="ms-font-sm" style={{ color: 'var(--ms-gray-80)' }}>
                Cross-app commands and automation
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-sm hover:bg-white/50 transition-colors"
          >
            <X size={20} style={{ color: 'var(--ms-gray-80)' }} />
          </motion.button>
        </div>

        {/* Conversation Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-96">
          {conversation.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-sm flex items-center justify-center" style={{ backgroundColor: 'var(--ms-purple)' }}>
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="ms-font-lg font-semibold mb-2" style={{ color: 'var(--ms-gray-130)' }}>
                Welcome to your AI Assistant
              </h3>
              <p className="ms-font-sm mb-6" style={{ color: 'var(--ms-gray-80)' }}>
                I can help you perform actions across your Microsoft 365 apps. Try one of the suggestions below or type your own command.
              </p>
              
              {/* Suggested Prompts */}
              <div className="space-y-2">
                <h4 className="ms-font-sm font-medium mb-3 flex items-center justify-center" style={{ color: 'var(--ms-gray-110)' }}>
                  <Lightbulb size={16} className="mr-2" style={{ color: 'var(--ms-orange)' }} />
                  Suggested Commands
                </h4>
                {suggestedPrompts.slice(0, 3).map((suggestion, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuggestedPrompt(suggestion)}
                    className="block w-full text-left p-3 rounded-sm ms-font-sm transition-colors border"
                    style={{ 
                      backgroundColor: 'var(--ms-gray-10)',
                      borderColor: 'var(--ms-gray-30)',
                      color: 'var(--ms-gray-110)'
                    }}
                  >
                    "{suggestion}"
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            conversation.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] p-4 rounded-sm ${
                  message.type === "user"
                    ? "text-white"
                    : ""
                }`}
                style={{
                  backgroundColor: message.type === "user" ? 'var(--ms-blue)' : 'var(--ms-gray-20)',
                  color: message.type === "user" ? 'white' : 'var(--ms-gray-130)'
                }}>
                  <div className="flex items-start space-x-2">
                    {message.type === "ai" && (
                      <Bot size={16} className="mt-1 flex-shrink-0" style={{ color: 'var(--ms-purple)' }} />
                    )}
                    {message.type === "user" && (
                      <User size={16} className="mt-1 flex-shrink-0 text-blue-100" />
                    )}
                    <p className="ms-font-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <p className={`ms-font-xs mt-2 ${
                    message.type === "user" ? "text-blue-100" : ""
                  }`}
                  style={{ color: message.type === "user" ? 'rgba(255,255,255,0.7)' : 'var(--ms-gray-70)' }}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))
          )}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="p-4 rounded-sm" style={{ backgroundColor: 'var(--ms-gray-20)' }}>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--ms-purple)' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--ms-purple)', animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--ms-purple)', animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="ms-font-sm" style={{ color: 'var(--ms-gray-80)' }}>AI is thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6" style={{ borderTop: `1px solid var(--ms-gray-30)` }}>
          <form onSubmit={handleSubmit} className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your command here... (e.g., 'Take names from Excel and add to Word')"
                className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 ms-font-sm transition-all"
                style={{ 
                  borderColor: 'var(--ms-gray-60)',
                  backgroundColor: 'white',
                  color: 'var(--ms-gray-110)'
                }}
                disabled={isLoading}
              />
              <MessageSquare className="absolute right-3 top-1/2 transform -translate-y-1/2" size={18} style={{ color: 'var(--ms-gray-60)' }} />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="px-6 py-3 rounded-sm ms-font-sm font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              style={{ backgroundColor: 'var(--ms-purple)' }}
            >
              <Send size={18} />
              <span>Send</span>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AIPrompt;