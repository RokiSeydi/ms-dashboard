import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Zap, MessageSquare, Lightbulb } from "lucide-react";

const suggestedPrompts = [
  "Take the names from my Excel contact list and create a Word document with them in bullet points",
  "Schedule a meeting with everyone who replied to my last email",
  "Summarize all emails from this week and create a PowerPoint slide",
  "Find all documents modified today and organize them in a OneDrive folder",
  "Create a calendar event for next week's project deadline from my task list"
];

function AIPrompt({ onClose }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Zap className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">AI Assistant</h2>
              <p className="text-sm text-gray-600">Cross-app commands and automation</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/50 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </motion.button>
        </div>

        {/* Conversation Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-96">
          {conversation.length === 0 ? (
            <div className="text-center py-8">
              <Sparkles className="mx-auto text-purple-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Welcome to your AI Assistant
              </h3>
              <p className="text-gray-600 mb-6">
                I can help you perform actions across your Microsoft 365 apps. Try one of the suggestions below or type your own command.
              </p>
              
              {/* Suggested Prompts */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center justify-center">
                  <Lightbulb size={16} className="mr-2" />
                  Suggested Commands
                </h4>
                {suggestedPrompts.slice(0, 3).map((suggestion, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuggestedPrompt(suggestion)}
                    className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
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
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  message.type === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.type === "ai" && (
                      <Zap size={16} className="text-purple-500 mt-1 flex-shrink-0" />
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <p className={`text-xs mt-2 ${
                    message.type === "user" ? "text-blue-100" : "text-gray-500"
                  }`}>
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
              <div className="bg-gray-100 p-4 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                  <span className="text-sm text-gray-600">AI is thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your command here... (e.g., 'Take names from Excel and add to Word')"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                disabled={isLoading}
              />
              <MessageSquare className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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