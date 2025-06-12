import React from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

const msalConfig = {
  auth: {
    clientId: "af619383-16e3-483b-8f1b-e1c8ba4c8906",
    authority: "https://login.microsoftonline.com/2b897507-ee8c-4575-830b-4f8267c3d307",
    redirectUri: "http://localhost:3000",
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <MsalProvider instance={msalInstance}>
        <AuthenticatedTemplate>
          <Dashboard />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Login />
        </UnauthenticatedTemplate>
      </MsalProvider>
    </FluentProvider>
  );
}

export default App;