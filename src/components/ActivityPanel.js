import React from "react";
import { motion } from "framer-motion";
import { 
  Button,
  Text,
  Title2,
  Title3,
  Body1,
  Caption1,
  Badge,
  Card,
  makeStyles,
  tokens,
  Divider
} from "@fluentui/react-components";
import { 
  Dismiss24Regular,
  Clock24Regular,
  Mail24Regular,
  Calendar24Regular,
  Document24Regular,
  People24Regular,
  Activity24Regular,
  Filter24Regular,
  MoreHorizontal24Regular
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  panel: {
    position: "fixed",
    right: 0,
    top: 0,
    height: "100vh",
    width: "320px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
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
  headerInfo: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  filterBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: tokens.spacingHorizontalL,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  activityList: {
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  activityCard: {
    padding: tokens.spacingHorizontalL,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    }
  },
  activityHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalM,
  },
  activityIcon: {
    width: "40px",
    height: "40px",
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForegroundInverted,
    flexShrink: 0,
  },
  activityContent: {
    flex: 1,
    minWidth: 0,
  },
  activityMeta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: tokens.spacingVerticalXS,
  },
  activityFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: tokens.spacingVerticalS,
  },
  timeInfo: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  quickActions: {
    padding: tokens.spacingHorizontalL,
    marginTop: tokens.spacingVerticalL,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  actionsList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalM,
  }
});

const mockActivities = [
  {
    id: 1,
    type: "email",
    title: "Meeting follow-up from Sarah",
    description: "Quarterly review discussion points and action items",
    time: "2 minutes ago",
    icon: Mail24Regular,
    priority: "high",
    app: "Outlook",
    color: tokens.colorPaletteBlueForeground1
  },
  {
    id: 2,
    type: "calendar",
    title: "Team standup starting soon",
    description: "Daily sync with development team",
    time: "In 28 minutes",
    icon: Calendar24Regular,
    priority: "high",
    app: "Calendar",
    color: tokens.colorPaletteGreenForeground1
  },
  {
    id: 3,
    type: "document",
    title: "Project proposal updated",
    description: "Budget section revised by John",
    time: "1 hour ago",
    icon: Document24Regular,
    priority: "normal",
    app: "Word",
    color: tokens.colorPaletteBlueForeground1
  },
  {
    id: 4,
    type: "teams",
    title: "New message in Marketing",
    description: "Campaign launch timeline discussion",
    time: "2 hours ago",
    icon: People24Regular,
    priority: "normal",
    app: "Teams",
    color: tokens.colorPalettePurpleForeground1
  },
  {
    id: 5,
    type: "email",
    title: "Client feedback received",
    description: "Positive response on latest deliverable",
    time: "3 hours ago",
    icon: Mail24Regular,
    priority: "low",
    app: "Outlook",
    color: tokens.colorPaletteBlueForeground1
  }
];

function ActivityPanel({ onClose }) {
  const styles = useStyles();

  return (
    <motion.div
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 320, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={styles.panel}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <Activity24Regular color={tokens.colorPaletteGreenForeground1} />
          <div>
            <Title2>Activity</Title2>
            <Caption1>Recent updates across your apps</Caption1>
          </div>
        </div>
        <Button
          appearance="subtle"
          icon={<Dismiss24Regular />}
          onClick={onClose}
        />
      </div>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <Button
          appearance="subtle"
          icon={<Filter24Regular />}
        >
          All apps
        </Button>
        <Button
          appearance="subtle"
          icon={<MoreHorizontal24Regular />}
        />
      </div>

      {/* Activity List */}
      <div className={styles.activityList}>
        {mockActivities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={styles.activityCard}>
                <div className={styles.activityHeader}>
                  <div 
                    className={styles.activityIcon}
                    style={{ backgroundColor: activity.color }}
                  >
                    <Icon />
                  </div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityMeta}>
                      <Text weight="semibold" truncate>
                        {activity.title}
                      </Text>
                      <Badge 
                        appearance="outline" 
                        size="small"
                      >
                        {activity.app}
                      </Badge>
                    </div>
                    <Caption1 style={{ 
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      marginBottom: tokens.spacingVerticalS
                    }}>
                      {activity.description}
                    </Caption1>
                    <div className={styles.activityFooter}>
                      <div className={styles.timeInfo}>
                        <Clock24Regular fontSize="12px" color={tokens.colorNeutralForeground3} />
                        <Caption1>{activity.time}</Caption1>
                      </div>
                      {activity.priority === 'high' && (
                        <Badge appearance="filled" color="danger" size="small" />
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>
          Quick Actions
        </Title3>
        <div className={styles.actionsList}>
          <Button
            appearance="primary"
            style={{ justifyContent: "flex-start" }}
          >
            Compose new email
          </Button>
          <Button
            appearance="outline"
            style={{ justifyContent: "flex-start" }}
          >
            Schedule meeting
          </Button>
          <Button
            appearance="outline"
            style={{ justifyContent: "flex-start" }}
          >
            Create document
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default ActivityPanel;