import React from "react";
import { motion } from "framer-motion";
import { 
  Button,
  Text,
  Title2,
  Title3,
  Body1,
  Caption1,
  Switch,
  Divider,
  makeStyles,
  tokens
} from "@fluentui/react-components";
import { 
  Dismiss24Regular,
  Add24Regular,
  Settings24Regular,
  Shield24Regular,
  Person24Regular,
  Lock24Regular,
  Globe24Regular,
  Alert24Regular,
  QuestionCircle24Regular
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  sidebar: {
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh",
    width: "320px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    zIndex: 50,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: tokens.spacingHorizontalXL,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  section: {
    padding: tokens.spacingHorizontalXL,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalL,
  },
  appList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  appItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: tokens.spacingHorizontalM,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
  },
  appInfo: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },
  preferences: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  preference: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accountLinks: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  accountLink: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    padding: tokens.spacingHorizontalS,
    borderRadius: tokens.borderRadiusSmall,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    }
  },
  helpLinks: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  }
});

function Sidebar({ connectedApps, setConnectedApps, onClose }) {
  const styles = useStyles();
  const disconnectedApps = connectedApps.filter(app => !app.connected);
  
  const handleConnectApp = (appId) => {
    setConnectedApps(prev => 
      prev.map(app => 
        app.id === appId ? { ...app, connected: true } : app
      )
    );
  };

  const handleDisconnectApp = (appId) => {
    setConnectedApps(prev => 
      prev.map(app => 
        app.id === appId ? { ...app, connected: false } : app
      )
    );
  };

  return (
    <motion.div
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -320, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={styles.sidebar}
    >
      {/* Header */}
      <div className={styles.header}>
        <Title2>Settings</Title2>
        <Button
          appearance="subtle"
          icon={<Dismiss24Regular />}
          onClick={onClose}
        />
      </div>

      {/* Connected Apps Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Shield24Regular color={tokens.colorPaletteGreenForeground1} />
          <Title3>Connected Apps</Title3>
        </div>
        <div className={styles.appList}>
          {connectedApps.filter(app => app.connected).map(app => (
            <div key={app.id} className={styles.appItem}>
              <div className={styles.appInfo}>
                <div 
                  className={styles.statusDot}
                  style={{ backgroundColor: tokens.colorPaletteGreenForeground1 }}
                />
                <Text weight="medium">{app.name}</Text>
              </div>
              <Button
                appearance="subtle"
                size="small"
                onClick={() => handleDisconnectApp(app.id)}
              >
                Disconnect
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Available Apps Section */}
      {disconnectedApps.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Add24Regular color={tokens.colorBrandForeground1} />
            <Title3>Available Apps</Title3>
          </div>
          <div className={styles.appList}>
            {disconnectedApps.map(app => (
              <div key={app.id} className={styles.appItem}>
                <div className={styles.appInfo}>
                  <div 
                    className={styles.statusDot}
                    style={{ backgroundColor: tokens.colorNeutralForeground3 }}
                  />
                  <Text weight="medium">{app.name}</Text>
                </div>
                <Button
                  appearance="primary"
                  size="small"
                  onClick={() => handleConnectApp(app.id)}
                >
                  Connect
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preferences Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Settings24Regular />
          <Title3>Preferences</Title3>
        </div>
        <div className={styles.preferences}>
          <div className={styles.preference}>
            <Body1>Notifications</Body1>
            <Switch defaultChecked />
          </div>
          <div className={styles.preference}>
            <Body1>Auto-refresh</Body1>
            <Switch defaultChecked />
          </div>
          <div className={styles.preference}>
            <Body1>Compact view</Body1>
            <Switch />
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Person24Regular />
          <Title3>Account</Title3>
        </div>
        <div className={styles.accountLinks}>
          <div className={styles.accountLink}>
            <Lock24Regular color={tokens.colorNeutralForeground3} />
            <Body1>Privacy & Security</Body1>
          </div>
          <div className={styles.accountLink}>
            <Globe24Regular color={tokens.colorNeutralForeground3} />
            <Body1>Language & Region</Body1>
          </div>
          <div className={styles.accountLink}>
            <Alert24Regular color={tokens.colorNeutralForeground3} />
            <Body1>Notification Settings</Body1>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <QuestionCircle24Regular />
          <Title3>Help & Support</Title3>
        </div>
        <div className={styles.helpLinks}>
          <Button appearance="subtle" style={{ justifyContent: "flex-start" }}>
            Getting Started Guide
          </Button>
          <Button appearance="subtle" style={{ justifyContent: "flex-start" }}>
            Keyboard Shortcuts
          </Button>
          <Button appearance="subtle" style={{ justifyContent: "flex-start" }}>
            Contact Support
          </Button>
          <Button appearance="subtle" style={{ justifyContent: "flex-start" }}>
            What's New
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;