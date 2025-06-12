import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Button,
  Input,
  Text,
  Title1,
  Title2,
  Title3,
  Body1,
  Caption1,
  makeStyles,
  tokens,
  Badge,
  Avatar,
  Toolbar,
  ToolbarButton,
  SearchBox,
  Divider
} from "@fluentui/react-components";
import { 
  Settings24Regular,
  Activity24Regular,
  Sparkle24Regular,
  Grid324Regular,
  List24Regular,
  Search24Regular,
  Alert24Regular,
  Person24Regular
} from "@fluentui/react-icons";
import AppGrid from "./AppGrid";
import Sidebar from "./Sidebar";
import ActivityPanel from "./ActivityPanel";
import AIPrompt from "./AIPrompt";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  header: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backdropFilter: "blur(20px)",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    gap: tokens.spacingHorizontalL,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
  },
  headerCenter: {
    flex: 1,
    maxWidth: "400px",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  main: {
    padding: tokens.spacingHorizontalXL,
  },
  mainContent: {
    maxWidth: "1400px",
    margin: "0 auto",
  },
  welcomeSection: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  welcomeHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: tokens.spacingVerticalL,
    flexWrap: "wrap",
    gap: tokens.spacingVerticalL,
  },
  statsContainer: {
    display: "flex",
    gap: tokens.spacingHorizontalXL,
    flexWrap: "wrap",
  },
  stat: {
    textAlign: "center",
  },
  aiButton: {
    position: "fixed",
    bottom: tokens.spacingVerticalXL,
    right: tokens.spacingHorizontalXL,
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    zIndex: 1000,
  },
  notificationBadge: {
    position: "absolute",
    top: "-4px",
    right: "-4px",
  }
});

function Dashboard() {
  const { accounts } = useMsal();
  const styles = useStyles();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [connectedApps, setConnectedApps] = useState([
    { id: 'outlook', name: 'Outlook', connected: true },
    { id: 'calendar', name: 'Calendar', connected: true },
    { id: 'word', name: 'Word', connected: false },
    { id: 'excel', name: 'Excel', connected: false },
    { id: 'powerpoint', name: 'PowerPoint', connected: false },
    { id: 'teams', name: 'Teams', connected: false },
    { id: 'onedrive', name: 'OneDrive', connected: false },
    { id: 'onenote', name: 'OneNote', connected: false }
  ]);

  const user = accounts[0];

  return (
    <div className={styles.container}>
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={styles.header}
      >
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <ToolbarButton
              appearance="subtle"
              icon={<Settings24Regular />}
              onClick={() => setShowSidebar(!showSidebar)}
            />
            <div>
              <Title1>Microsoft 365</Title1>
              <Caption1>Welcome back, {user?.name}</Caption1>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className={styles.headerCenter}>
            <SearchBox
              placeholder="Search across your apps..."
              value={searchQuery}
              onChange={(e, data) => setSearchQuery(data.value)}
              size="large"
            />
          </div>
          
          <div className={styles.headerRight}>
            <div style={{ position: "relative" }}>
              <ToolbarButton
                appearance="subtle"
                icon={<Alert24Regular />}
              />
              <Badge 
                appearance="filled" 
                color="danger" 
                size="small"
                className={styles.notificationBadge}
              >
                3
              </Badge>
            </div>
            
            <ToolbarButton
              appearance="subtle"
              icon={<Activity24Regular />}
              onClick={() => setShowActivity(!showActivity)}
            />
            
            <Avatar
              name={user?.name}
              size={32}
              color="brand"
            />
          </div>
        </div>
      </motion.header>

      <div style={{ display: "flex" }}>
        {/* Left Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <Sidebar 
              connectedApps={connectedApps}
              setConnectedApps={setConnectedApps}
              onClose={() => setShowSidebar(false)}
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={styles.main} style={{ flex: 1 }}>
          <div className={styles.mainContent}>
            {/* Welcome Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className={styles.welcomeSection}
            >
              <div className={styles.welcomeHeader}>
                <div>
                  <Title2 style={{ marginBottom: tokens.spacingVerticalS }}>
                    Your apps
                  </Title2>
                  <Body1>
                    Access and manage your Microsoft 365 applications
                  </Body1>
                </div>
                
                {/* Quick Stats */}
                <div className={styles.statsContainer}>
                  <div className={styles.stat}>
                    <Title2 style={{ color: tokens.colorBrandForeground1 }}>
                      {connectedApps.filter(app => app.connected).length}
                    </Title2>
                    <Caption1>Connected</Caption1>
                  </div>
                  <div className={styles.stat}>
                    <Title2 style={{ color: tokens.colorPaletteGreenForeground1 }}>
                      12
                    </Title2>
                    <Caption1>Active today</Caption1>
                  </div>
                  <div className={styles.stat}>
                    <Title2 style={{ color: tokens.colorPaletteOrangeForeground1 }}>
                      5
                    </Title2>
                    <Caption1>Notifications</Caption1>
                  </div>
                </div>
              </div>
            </motion.div>

            <AppGrid connectedApps={connectedApps} searchQuery={searchQuery} />
          </div>
        </main>

        {/* Right Activity Panel */}
        <AnimatePresence>
          {showActivity && (
            <ActivityPanel onClose={() => setShowActivity(false)} />
          )}
        </AnimatePresence>
      </div>

      {/* AI Assistant Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <Button
          appearance="primary"
          shape="circular"
          size="large"
          icon={<Sparkle24Regular />}
          className={styles.aiButton}
          onClick={() => setShowAI(true)}
        />
      </motion.div>

      {/* AI Prompt Modal */}
      <AnimatePresence>
        {showAI && (
          <AIPrompt onClose={() => setShowAI(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;