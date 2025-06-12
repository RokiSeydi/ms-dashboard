import React from "react";
import { useMsal } from "@azure/msal-react";
import { motion } from "framer-motion";
import { 
  Button, 
  Card, 
  CardHeader, 
  CardPreview,
  Text, 
  Title1, 
  Title2, 
  Title3,
  Body1,
  Caption1,
  makeStyles,
  tokens,
  Divider
} from "@fluentui/react-components";
import { 
  Shield24Regular, 
  Calendar24Regular, 
  Mail24Regular, 
  Document24Regular, 
  Sparkle24Regular,
  CheckmarkCircle24Regular
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    display: "flex",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  leftPanel: {
    display: "none",
    "@media (min-width: 1024px)": {
      display: "flex",
      width: "50%",
      background: `linear-gradient(135deg, ${tokens.colorBrandBackground} 0%, ${tokens.colorCompoundBrandBackground} 100%)`,
      position: "relative",
      overflow: "hidden",
    }
  },
  leftContent: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: tokens.spacingHorizontalXXXL,
    color: tokens.colorNeutralForegroundInverted,
  },
  logo: {
    width: "64px",
    height: "64px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: tokens.spacingVerticalXL,
  },
  logoInner: {
    width: "32px",
    height: "32px",
    backgroundColor: tokens.colorNeutralForegroundInverted,
    borderRadius: tokens.borderRadiusSmall,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoIcon: {
    width: "16px",
    height: "16px",
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusSmall,
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacingHorizontalXL,
  },
  loginCard: {
    width: "100%",
    maxWidth: "400px",
    padding: tokens.spacingHorizontalXXL,
  },
  mobileHeader: {
    textAlign: "center",
    marginBottom: tokens.spacingVerticalXXL,
    "@media (min-width: 1024px)": {
      display: "none",
    }
  },
  mobileLogo: {
    width: "64px",
    height: "64px",
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    marginBottom: tokens.spacingVerticalL,
  },
  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalXXL,
  },
  feature: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalL,
  },
  featureIcon: {
    width: "40px",
    height: "40px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  benefitsList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalXXL,
  },
  benefit: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  signInButton: {
    width: "100%",
    marginBottom: tokens.spacingVerticalL,
  },
  helpLinks: {
    marginTop: tokens.spacingVerticalXL,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  }
});

function Login() {
  const { instance } = useMsal();
  const styles = useStyles();

  const handleLogin = () => {
    instance
      .loginPopup({ 
        scopes: ["user.read", "mail.read", "calendars.read", "files.read"] 
      })
      .catch((e) => console.error(e));
  };

  const features = [
    {
      icon: Mail24Regular,
      title: "Unified inbox",
      description: "See all your emails and messages in one place"
    },
    {
      icon: Calendar24Regular,
      title: "Smart scheduling",
      description: "AI-powered calendar management and meeting insights"
    },
    {
      icon: Document24Regular,
      title: "Document hub",
      description: "Access and collaborate on all your files seamlessly"
    },
    {
      icon: Sparkle24Regular,
      title: "Cross-app automation",
      description: "Perform actions across multiple apps with AI commands"
    }
  ];

  return (
    <div className={styles.container}>
      {/* Left Panel - Branding */}
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.logo}>
              <div className={styles.logoInner}>
                <div className={styles.logoIcon}></div>
              </div>
            </div>
            
            <Title1 as="h1" style={{ marginBottom: tokens.spacingVerticalL, color: tokens.colorNeutralForegroundInverted }}>
              Microsoft 365
            </Title1>
            
            <Body1 style={{ marginBottom: tokens.spacingVerticalXXL, color: "rgba(255, 255, 255, 0.8)" }}>
              Your intelligent workspace that brings together the apps and services you use every day.
            </Body1>

            <div className={styles.featureList}>
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className={styles.feature}
                  >
                    <div className={styles.featureIcon}>
                      <Icon />
                    </div>
                    <div>
                      <Text weight="semibold" style={{ color: tokens.colorNeutralForegroundInverted, display: "block", marginBottom: tokens.spacingVerticalXS }}>
                        {feature.title}
                      </Text>
                      <Caption1 style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                        {feature.description}
                      </Caption1>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Login */}
      <div className={styles.rightPanel}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.loginCard}
        >
          {/* Mobile Logo */}
          <div className={styles.mobileHeader}>
            <div className={styles.mobileLogo}>
              <div className={styles.logoInner}>
                <div className={styles.logoIcon}></div>
              </div>
            </div>
            <Title2>Microsoft 365</Title2>
          </div>

          {/* Sign In Card */}
          <Card>
            <CardHeader
              header={
                <div style={{ textAlign: "center", marginBottom: tokens.spacingVerticalXL }}>
                  <Title2 style={{ marginBottom: tokens.spacingVerticalS }}>Sign in</Title2>
                  <Body1>to continue to Microsoft 365</Body1>
                </div>
              }
            />

            {/* Benefits */}
            <div className={styles.benefitsList}>
              <div className={styles.benefit}>
                <CheckmarkCircle24Regular color={tokens.colorPaletteGreenForeground1} />
                <Caption1>Secure access to all your apps</Caption1>
              </div>
              <div className={styles.benefit}>
                <CheckmarkCircle24Regular color={tokens.colorPaletteGreenForeground1} />
                <Caption1>Unified activity and notifications</Caption1>
              </div>
              <div className={styles.benefit}>
                <CheckmarkCircle24Regular color={tokens.colorPaletteGreenForeground1} />
                <Caption1>AI-powered cross-app commands</Caption1>
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              appearance="primary"
              size="large"
              className={styles.signInButton}
              onClick={handleLogin}
            >
              Sign in with Microsoft
            </Button>

            <Divider />

            <Caption1 style={{ textAlign: "center", color: tokens.colorNeutralForeground3 }}>
              By signing in, you agree to our{' '}
              <a href="#" style={{ color: tokens.colorBrandForeground1 }}>
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" style={{ color: tokens.colorBrandForeground1 }}>
                Privacy Policy
              </a>
            </Caption1>
          </Card>

          {/* Help Links */}
          <div className={styles.helpLinks}>
            <a href="#" style={{ color: tokens.colorBrandForeground1, textDecoration: "none" }}>
              <Caption1>Can't access your account?</Caption1>
            </a>
            <a href="#" style={{ color: tokens.colorBrandForeground1, textDecoration: "none" }}>
              <Caption1>Sign-in options</Caption1>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;