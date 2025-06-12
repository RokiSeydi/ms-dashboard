import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Card,
  CardHeader,
  CardPreview,
  Button,
  Text,
  Title3,
  Body1,
  Caption1,
  Badge,
  Avatar,
  makeStyles,
  tokens,
  ToggleButton,
  Divider
} from "@fluentui/react-components";
import { 
  Mail24Regular, 
  Calendar24Regular, 
  Document24Regular, 
  DataBarVertical24Regular, 
  SlideDesign24Regular, 
  People24Regular, 
  Cloud24Regular, 
  Notebook24Regular,
  Open24Regular,
  Clock24Regular,
  CheckmarkCircle24Regular,
  Grid324Regular,
  List24Regular,
  MoreHorizontal24Regular,
  Star24Regular,
  TrendingUp24Regular,
  Connect24Regular
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXL,
  },
  viewControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: tokens.spacingVerticalM,
  },
  viewToggle: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
  },
  searchResults: {
    color: tokens.colorNeutralForeground3,
  },
  connectionStatus: {
    color: tokens.colorNeutralForeground3,
  },
  gridContainer: {
    display: "grid",
    gap: tokens.spacingVerticalL,
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    }
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  appCard: {
    cursor: "pointer",
    transition: "all 0.2s ease",
    position: "relative",
    "&:hover": {
      transform: "translateY(-2px)",
    }
  },
  appCardSelected: {
    borderColor: tokens.colorBrandStroke1,
    borderWidth: "2px",
  },
  appCardDisconnected: {
    opacity: 0.6,
  },
  listCard: {
    display: "flex",
    alignItems: "center",
    padding: tokens.spacingHorizontalL,
    gap: tokens.spacingHorizontalL,
  },
  appIcon: {
    width: "48px",
    height: "48px",
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForegroundInverted,
  },
  listIcon: {
    width: "40px",
    height: "40px",
  },
  cardContent: {
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  cardHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  cardActions: {
    position: "absolute",
    top: tokens.spacingVerticalM,
    right: tokens.spacingHorizontalM,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  stats: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
    flexWrap: "wrap",
  },
  stat: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  expandedContent: {
    marginTop: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalM,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  activityItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activityInfo: {
    flex: 1,
  },
  connectPrompt: {
    padding: tokens.spacingHorizontalXL,
    display: "flex",
    gap: tokens.spacingHorizontalL,
    alignItems: "flex-start",
  },
  connectIcon: {
    width: "48px",
    height: "48px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorBrandForeground1,
  },
  connectContent: {
    flex: 1,
  },
  appTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalXS,
    marginTop: tokens.spacingVerticalM,
  }
});

const appIcons = {
  outlook: Mail24Regular,
  calendar: Calendar24Regular,
  word: Document24Regular,
  excel: DataBarVertical24Regular,
  powerpoint: SlideDesign24Regular,
  teams: People24Regular,
  onedrive: Cloud24Regular,
  onenote: Notebook24Regular
};

const appColors = {
  outlook: tokens.colorPaletteBlueForeground1,
  calendar: tokens.colorPaletteGreenForeground1,
  word: tokens.colorPaletteBlueForeground1,
  excel: tokens.colorPaletteGreenForeground1,
  powerpoint: tokens.colorPaletteOrangeForeground1,
  teams: tokens.colorPalettePurpleForeground1,
  onedrive: tokens.colorPaletteBlueForeground1,
  onenote: tokens.colorPalettePurpleForeground1
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
  const styles = useStyles();
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
    <div className={styles.container}>
      {/* View Controls */}
      <div className={styles.viewControls}>
        <div style={{ display: "flex", alignItems: "center", gap: tokens.spacingHorizontalL }}>
          <div className={styles.viewToggle}>
            <ToggleButton
              checked={viewMode === "grid"}
              onClick={() => setViewMode("grid")}
              icon={<Grid324Regular />}
            />
            <ToggleButton
              checked={viewMode === "list"}
              onClick={() => setViewMode("list")}
              icon={<List24Regular />}
            />
          </div>
          
          {searchQuery && (
            <Caption1 className={styles.searchResults}>
              {filteredApps.length} result{filteredApps.length !== 1 ? 's' : ''} for "{searchQuery}"
            </Caption1>
          )}
        </div>

        <Caption1 className={styles.connectionStatus}>
          {connectedApps.filter(app => app.connected).length} of {connectedApps.length} connected
        </Caption1>
      </div>

      {/* Apps Grid/List */}
      <div className={viewMode === "grid" ? styles.gridContainer : styles.listContainer}>
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
            >
              <Card
                className={`${styles.appCard} ${
                  isSelected ? styles.appCardSelected : ""
                } ${!app.connected ? styles.appCardDisconnected : ""}`}
                onClick={() => handleAppClick(app)}
              >
                {viewMode === "list" ? (
                  <div className={styles.listCard}>
                    <div 
                      className={`${styles.appIcon} ${styles.listIcon}`}
                      style={{ backgroundColor: appColors[app.id] }}
                    >
                      <Icon />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Title3>{app.name}</Title3>
                      <Caption1>
                        {app.connected ? "Connected and synced" : "Not connected"}
                      </Caption1>
                      {app.connected && appData && (
                        <div className={styles.stats}>
                          {Object.entries(appData.stats).slice(0, 2).map(([key, value]) => (
                            <div key={key} className={styles.stat}>
                              <Caption1 style={{ textTransform: "capitalize" }}>{key}:</Caption1>
                              <Text weight="semibold">{value}</Text>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {app.connected && (
                      <div style={{ display: "flex", alignItems: "center", gap: tokens.spacingHorizontalS }}>
                        <TrendingUp24Regular color={tokens.colorPaletteGreenForeground1} />
                        <Open24Regular color={tokens.colorNeutralForeground3} />
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Card Actions */}
                    <div className={styles.cardActions}>
                      {app.connected && (
                        <Button
                          appearance="subtle"
                          size="small"
                          icon={<Star24Regular />}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(app.id);
                          }}
                          style={{ 
                            color: isFavorite ? tokens.colorPaletteOrangeForeground1 : tokens.colorNeutralForeground3 
                          }}
                        />
                      )}
                      <Badge 
                        appearance={app.connected ? "filled" : "outline"}
                        color={app.connected ? "success" : "subtle"}
                        size="small"
                      />
                    </div>

                    <div className={styles.cardContent}>
                      {/* App Icon */}
                      <div 
                        className={styles.appIcon}
                        style={{ backgroundColor: appColors[app.id] }}
                      >
                        <Icon />
                      </div>

                      {/* App Info */}
                      <div>
                        <Title3 style={{ marginBottom: tokens.spacingVerticalXS }}>
                          {app.name}
                        </Title3>
                        <Caption1>
                          {app.connected ? "Connected and synced" : "Not connected"}
                        </Caption1>
                        
                        {app.connected && appData && (
                          <div className={styles.stats} style={{ marginTop: tokens.spacingVerticalS }}>
                            {Object.entries(appData.stats).slice(0, 2).map(([key, value]) => (
                              <div key={key} className={styles.stat}>
                                <Caption1 style={{ textTransform: "capitalize" }}>{key}:</Caption1>
                                <Text weight="semibold">{value}</Text>
                              </div>
                            ))}
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
                            className={styles.expandedContent}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: tokens.spacingHorizontalS, marginBottom: tokens.spacingVerticalM }}>
                              <Clock24Regular color={tokens.colorNeutralForeground3} />
                              <Text weight="semibold">Recent Activity</Text>
                            </div>
                            <div className={styles.activityList}>
                              {appData.recentActivity.map((activity, index) => (
                                <div key={index} className={styles.activityItem}>
                                  <div className={styles.activityInfo}>
                                    <Body1>{activity.title}</Body1>
                                    <Caption1>{activity.time}</Caption1>
                                  </div>
                                  {activity.priority === 'high' && (
                                    <Badge appearance="filled" color="danger" size="small" />
                                  )}
                                </div>
                              ))}
                            </div>
                            <Button
                              appearance="primary"
                              style={{ 
                                width: "100%", 
                                marginTop: tokens.spacingVerticalM,
                                backgroundColor: appColors[app.id]
                              }}
                            >
                              Open {app.name}
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Connection Prompt for Disconnected Apps */}
      {connectedApps.some(app => !app.connected) && !searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <div className={styles.connectPrompt}>
              <div className={styles.connectIcon}>
                <Connect24Regular />
              </div>
              <div className={styles.connectContent}>
                <Title3 style={{ marginBottom: tokens.spacingVerticalS }}>
                  Connect more apps
                </Title3>
                <Body1 style={{ marginBottom: tokens.spacingVerticalM }}>
                  Get the most out of your Microsoft 365 experience by connecting additional apps.
                </Body1>
                <div className={styles.appTags}>
                  {connectedApps.filter(app => !app.connected).map(app => (
                    <Badge 
                      key={app.id} 
                      appearance="outline"
                      size="medium"
                    >
                      {app.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

export default AppGrid;