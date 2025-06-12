import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Button,
  Input,
  Text,
  Title2,
  Title3,
  Body1,
  Caption1,
  Card,
  makeStyles,
  tokens,
  Divider
} from "@fluentui/react-components";
import { 
  Dismiss24Regular,
  Send24Regular,
  Sparkle24Regular,
  Bot24Regular,
  Person24Regular,
  Lightbulb24Regular,
  Chat24Regular
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(8px)",
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacingHorizontalL,
  },
  modal: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    width: "100%",
    maxWidth: "600px",
    maxHeight: "80vh",
    overflow: "hidden",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: tokens.spacingHorizontalXL,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  headerInfo: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  headerIcon: {
    width: "40px",
    height: "40px",
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForegroundInverted,
  },
  conversation: {
    flex: 1,
    overflowY: "auto",
    padding: tokens.spacingHorizontalXL,
    maxHeight: "400px",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  welcomeContent: {
    textAlign: "center",
    padding: tokens.spacingVerticalXXL,
  },
  welcomeIcon: {
    width: "64px",
    height: "64px",
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForegroundInverted,
    margin: "0 auto",
    marginBottom: tokens.spacingVerticalL,
  },
  suggestedPrompts: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalXL,
  },
  promptButton: {
    textAlign: "left",
    padding: tokens.spacingHorizontalM,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    }
  },
  message: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
  },
  messageUser: {
    justifyContent: "flex-end",
  },
  messageContent: {
    maxWidth: "80%",
    padding: tokens.spacingHorizontalL,
    borderRadius: tokens.borderRadiusMedium,
  },
  messageContentUser: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
  },
  messageContentAI: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  messageAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  loadingIndicator: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    maxWidth: "80%",
  },
  loadingDots: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
  },
  loadingDot: {
    width: "8px",
    height: "8px",
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: "50%",
    animation: "bounce 1.4s ease-in-out infinite both",
    "&:nth-child(1)": { animationDelay: "-0.32s" },
    "&:nth-child(2)": { animationDelay: "-0.16s" },
  },
  inputArea: {
    padding: tokens.spacingHorizontalXL,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  inputContainer: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    alignItems: "flex-end",
  },
  inputWrapper: {
    flex: 1,
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    right: tokens.spacingHorizontalM,
    top: "50%",
    transform: "translateY(-50%)",
    color: tokens.colorNeutralForeground3,
  }
});

const suggestedPrompts = [
  "Take the names from my Excel contact list and create a Word document with them in bullet points",
  "Schedule a meeting with everyone who replied to my last email",
  "Summarize all emails from this week and create a PowerPoint slide",
  "Find all documents modified today and organize them in a OneDrive folder",
  "Create a calendar event for next week's project deadline from my task list"
];

function AIPrompt({ onClose }) {
  const styles = useStyles();
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
      className={styles.overlay}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <div className={styles.headerIcon}>
              <Sparkle24Regular />
            </div>
            <div>
              <Title2>AI Assistant</Title2>
              <Caption1>Cross-app commands and automation</Caption1>
            </div>
          </div>
          <Button
            appearance="subtle"
            icon={<Dismiss24Regular />}
            onClick={onClose}
          />
        </div>

        {/* Conversation Area */}
        <div className={styles.conversation}>
          {conversation.length === 0 ? (
            <div className={styles.welcomeContent}>
              <div className={styles.welcomeIcon}>
                <Sparkle24Regular fontSize="32px" />
              </div>
              <Title3 style={{ marginBottom: tokens.spacingVerticalS }}>
                Welcome to your AI Assistant
              </Title3>
              <Body1 style={{ marginBottom: tokens.spacingVerticalXL }}>
                I can help you perform actions across your Microsoft 365 apps. Try one of the suggestions below or type your own command.
              </Body1>
              
              {/* Suggested Prompts */}
              <div style={{ display: "flex", alignItems: "center", gap: tokens.spacingHorizontalS, marginBottom: tokens.spacingVerticalM }}>
                <Lightbulb24Regular color={tokens.colorPaletteOrangeForeground1} />
                <Text weight="semibold">Suggested Commands</Text>
              </div>
              <div className={styles.suggestedPrompts}>
                {suggestedPrompts.slice(0, 3).map((suggestion, index) => (
                  <Button
                    key={index}
                    appearance="subtle"
                    className={styles.promptButton}
                    onClick={() => handleSuggestedPrompt(suggestion)}
                  >
                    <Caption1>"{suggestion}"</Caption1>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            conversation.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${styles.message} ${message.type === "user" ? styles.messageUser : ""}`}
              >
                {message.type === "ai" && (
                  <div className={styles.messageAvatar} style={{ backgroundColor: tokens.colorBrandBackground }}>
                    <Bot24Regular color={tokens.colorNeutralForegroundInverted} />
                  </div>
                )}
                <div className={`${styles.messageContent} ${
                  message.type === "user" ? styles.messageContentUser : styles.messageContentAI
                }`}>
                  <Body1 style={{ whiteSpace: "pre-wrap" }}>{message.content}</Body1>
                  <Caption1 style={{ 
                    marginTop: tokens.spacingVerticalS,
                    opacity: 0.7
                  }}>
                    {message.timestamp.toLocaleTimeString()}
                  </Caption1>
                </div>
                {message.type === "user" && (
                  <div className={styles.messageAvatar} style={{ backgroundColor: tokens.colorNeutralBackground3 }}>
                    <Person24Regular />
                  </div>
                )}
              </motion.div>
            ))
          )}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.message}
            >
              <div className={styles.messageAvatar} style={{ backgroundColor: tokens.colorBrandBackground }}>
                <Bot24Regular color={tokens.colorNeutralForegroundInverted} />
              </div>
              <div className={styles.loadingIndicator}>
                <div className={styles.loadingDots}>
                  <div className={styles.loadingDot}></div>
                  <div className={styles.loadingDot}></div>
                  <div className={styles.loadingDot}></div>
                </div>
                <Caption1>AI is thinking...</Caption1>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className={styles.inputArea}>
          <form onSubmit={handleSubmit} className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              <Input
                value={prompt}
                onChange={(e, data) => setPrompt(data.value)}
                placeholder="Type your command here... (e.g., 'Take names from Excel and add to Word')"
                disabled={isLoading}
                size="large"
                style={{ width: "100%" }}
              />
              <Chat24Regular className={styles.inputIcon} />
            </div>
            <Button
              type="submit"
              appearance="primary"
              disabled={!prompt.trim() || isLoading}
              icon={<Send24Regular />}
              size="large"
            >
              Send
            </Button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AIPrompt;